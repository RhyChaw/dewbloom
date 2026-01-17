"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash2, GripVertical } from "lucide-react"
import TipTapEditor from "@/components/TipTapEditor"
import { convertContentToTipTap, convertTipTapToContent } from "@/lib/content-converter"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useToast } from "@/hooks/useToast"

function SortableInfoBox({ box, index, onUpdate, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: `box-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="card-surface p-5 mb-4 border-2 border-blue-100 resize-y overflow-auto min-h-[200px] max-h-[800px]">
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-blue-600 mb-3 bg-blue-50 px-2 py-1 rounded-lg inline-block">
            Info Box #{index + 1}
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <TipTapEditor
              content={box.content || { type: 'doc', content: [] }}
              onChange={(json) => onUpdate(index, { ...box, content: json })}
            />
          </div>
        </div>
        <button
          onClick={() => onDelete(index)}
          className="p-2 hover:bg-red-100 rounded-xl text-red-500 transition-colors flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function TheoryModuleEditor({ module, onSave }) {
  const [title, setTitle] = useState(module.title)
  const [infoBoxes, setInfoBoxes] = useState([])
  const [boxesPerPage, setBoxesPerPage] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const { showSuccess, showError } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setTitle(module.title)
    if (module.content && module.content.infoBoxes) {
      setInfoBoxes(module.content.infoBoxes.map(box => ({
        ...box,
        content: convertContentToTipTap(box.content || { sections: [] })
      })))
    } else {
      setInfoBoxes([])
    }
    if (module.content && module.content.boxesPerPage) {
      setBoxesPerPage(module.content.boxesPerPage)
    }
  }, [module])

  const handleAddBox = () => {
    setInfoBoxes([...infoBoxes, {
      content: { type: 'doc', content: [] }
    }])
  }

  const handleUpdateBox = (index, updatedBox) => {
    const newBoxes = [...infoBoxes]
    newBoxes[index] = updatedBox
    setInfoBoxes(newBoxes)
  }

  const handleDeleteBox = (index) => {
    setInfoBoxes(infoBoxes.filter((_, i) => i !== index))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-')[1])
      const newIndex = parseInt(over.id.split('-')[1])
      setInfoBoxes(arrayMove(infoBoxes, oldIndex, newIndex))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      // Convert TipTap content to structured format
      const structuredBoxes = infoBoxes.map(box => ({
        content: convertTipTapToContent(box.content)
      }))

      // Generate submodules based on boxesPerPage
      const pages = []
      for (let i = 0; i < structuredBoxes.length; i += boxesPerPage) {
        pages.push({
          pageNumber: Math.floor(i / boxesPerPage) + 1,
          boxes: structuredBoxes.slice(i, i + boxesPerPage)
        })
      }

      const response = await fetch(`/api/admin/module/${module.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: {
            infoBoxes: structuredBoxes,
            boxesPerPage,
          },
          submodules: pages,
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        onSave(updated)
        setError(null)
      } else {
        const data = await response.json()
        setError(data.error || data.details || "Failed to save module")
        console.error("Save error:", data)
      }
    } catch (err) {
      console.error("Error saving module:", err)
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg font-bold bg-white"
            placeholder="Module title"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="ml-4 btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span>Boxes per page:</span>
            <input
              type="number"
              min="1"
              value={boxesPerPage}
              onChange={(e) => setBoxesPerPage(parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 bg-white"
            />
          </label>
          <span className="text-sm text-gray-600 bg-white px-3 py-2 rounded-xl border border-gray-200">
            {Math.ceil(infoBoxes.length / boxesPerPage)} page{Math.ceil(infoBoxes.length / boxesPerPage) !== 1 ? 's' : ''} total
          </span>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Information Boxes</h3>
          <button
            onClick={handleAddBox}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Box
          </button>
        </div>

        {infoBoxes.length === 0 ? (
          <div className="card-surface text-center py-12 border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium mb-2">No information boxes yet</p>
            <p className="text-sm text-gray-400">Click "Add Box" to create your first content box</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={infoBoxes.map((_, i) => `box-${i}`)}
              strategy={verticalListSortingStrategy}
            >
              {infoBoxes.map((box, index) => (
                <SortableInfoBox
                  key={index}
                  box={box}
                  index={index}
                  onUpdate={handleUpdateBox}
                  onDelete={handleDeleteBox}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}
