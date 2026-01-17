"use client"

import { useState, useEffect } from "react"
import { GripVertical, Eye, EyeOff, GitBranch } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableFlowItem({ module, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const submodules = module.submodules || []
  const hasSubmodules = submodules.length > 0

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-surface p-5 mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-purple-600 transition-colors"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              #{index + 1}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              module.type === 'THEORY' 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-purple-100 text-purple-800 border border-purple-200'
            }`}>
              {module.type}
            </span>
            {module.published ? (
              <Eye className="w-4 h-4 text-green-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {hasSubmodules && (
            <div className="mt-3 pl-6 border-l-2 border-purple-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Submodules (Pages):</div>
              <div className="space-y-2">
                {submodules.map((submodule, idx) => (
                  <div key={idx} className="text-sm text-gray-700 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                    <span className="font-medium">Page {submodule.pageNumber}:</span> {submodule.boxes?.length || 0} box(es)
                  </div>
                ))}
              </div>
            </div>
          )}

          {module.type === 'QUESTION' && module.content?.questions && (
            <div className="mt-3 pl-6 border-l-2 border-purple-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Questions:</div>
              <div className="text-sm text-gray-700 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                {module.content.questions.length} question(s)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FlowTab() {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadFlow()
  }, [])

  const loadFlow = async () => {
    try {
      setError(null)
      const response = await fetch("/api/admin/flow?courseSlug=dewbloom-dbt")
      if (response.ok) {
        const data = await response.json()
        setModules(data.modules || [])
      } else {
        setError("Failed to load course flow")
      }
    } catch (err) {
      console.error("Error loading flow:", err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = modules.findIndex(m => m.id === active.id)
    const newIndex = modules.findIndex(m => m.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const newModules = arrayMove(modules, oldIndex, newIndex)
    setModules(newModules)
    setSaving(true)

    // Update orderIndex for all affected modules
    try {
      const updates = newModules.map((module, index) => 
        fetch(`/api/admin/module/${module.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIndex: index }),
        })
      )
      await Promise.all(updates)
    } catch (err) {
      console.error("Error updating module order:", err)
      setError("Failed to save new order. Please refresh the page.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading course flow...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Course Flow</h2>
            <p className="text-gray-600 text-sm mt-1">
              Drag and drop modules to reorder. This is the order learners will see.
            </p>
          </div>
        </div>
        {saving && (
          <div className="mt-2 text-sm text-purple-600 font-medium">Saving order...</div>
        )}
      </div>

      {error && (
        <div className="mb-4 card-surface p-4 bg-red-50 border-red-200 text-red-700">
          {error}
        </div>
      )}

      {modules.length === 0 ? (
        <div className="card-surface text-center py-12 border-2 border-dashed border-gray-200">
          <GitBranch className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 font-medium mb-2">No modules in course flow</p>
          <p className="text-sm text-gray-400">Create modules in the Modules tab</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={modules.map(m => m.id)}
            strategy={verticalListSortingStrategy}
          >
            {modules.map((module, index) => (
              <SortableFlowItem
                key={module.id}
                module={module}
                index={index}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <div className="mt-8 card-surface p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-600" />
          Flow JSON (for Flutter app)
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Use this endpoint to fetch the full course flow:
        </p>
        <code className="block p-4 bg-white rounded-xl border border-purple-200 text-xs text-gray-800 font-mono">
          GET /api/admin/flow?courseSlug=dewbloom-dbt
        </code>
      </div>
    </div>
  )
}
