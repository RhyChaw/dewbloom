"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, GripVertical, Layers, Edit2 } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useToast } from "@/hooks/useToast"

function SortableChapterItem({ chapter, index, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: chapter.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              #{index + 1}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
          </div>
          {chapter.description && (
            <p className="text-sm text-gray-600 mt-2">{chapter.description}</p>
          )}
          <div className="mt-3 text-xs text-gray-500">
            {chapter.modules?.length || 0} module(s)
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(chapter)}
            className="p-2 hover:bg-blue-100 rounded-xl text-blue-500 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(chapter.id)}
            className="p-2 hover:bg-red-100 rounded-xl text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChaptersTab() {
  const [chapters, setChapters] = useState([])
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingChapter, setEditingChapter] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { showSuccess, showError } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadCourse()
  }, [])

  const loadCourse = async () => {
    try {
      setError(null)
      const response = await fetch("/api/course/dewbloom-dbt")
      if (response.ok) {
        const courseData = await response.json()
        setCourse(courseData)
        loadChapters()
      } else {
        setError("Course not found. Please seed the database first.")
      }
    } catch (err) {
      console.error("Error loading course:", err)
      setError("Failed to load course.")
    } finally {
      setLoading(false)
    }
  }

  const loadChapters = async () => {
    try {
      const response = await fetch("/api/admin/chapters?courseSlug=dewbloom-dbt")
      if (response.ok) {
        const data = await response.json()
        setChapters(data.chapters || [])
      }
    } catch (err) {
      console.error("Error loading chapters:", err)
    }
  }

  const handleCreate = async () => {
    if (!course || !title.trim()) {
      showError("Please enter a chapter title")
      return
    }

    try {
      setError(null)
      const response = await fetch("/api/admin/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          title: title.trim(),
          description: description.trim() || null,
          orderIndex: chapters.length,
        }),
      })

      if (response.ok) {
        const newChapter = await response.json()
        setChapters([...chapters, newChapter])
        setTitle("")
        setDescription("")
        setShowCreate(false)
        showSuccess("Chapter created successfully!")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create chapter")
        showError(data.error || "Failed to create chapter")
      }
    } catch (err) {
      console.error("Error creating chapter:", err)
      setError("Network error. Please try again.")
      showError("Network error. Please try again.")
    }
  }

  const handleUpdate = async () => {
    if (!editingChapter || !title.trim()) {
      showError("Please enter a chapter title")
      return
    }

    try {
      setError(null)
      const response = await fetch(`/api/admin/chapter/${editingChapter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        setChapters(chapters.map(c => c.id === updated.id ? updated : c))
        setEditingChapter(null)
        setTitle("")
        setDescription("")
        showSuccess("Chapter updated successfully!")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update chapter")
        showError(data.error || "Failed to update chapter")
      }
    } catch (err) {
      console.error("Error updating chapter:", err)
      setError("Network error. Please try again.")
      showError("Network error. Please try again.")
    }
  }

  const handleDelete = async (chapterId) => {
    if (!confirm("Are you sure you want to delete this chapter? Modules in this chapter will be unassigned.")) return

    try {
      setError(null)
      const response = await fetch(`/api/admin/chapter/${chapterId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setChapters(chapters.filter(c => c.id !== chapterId))
        showSuccess("Chapter deleted successfully!")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete chapter")
        showError(data.error || "Failed to delete chapter")
      }
    } catch (err) {
      console.error("Error deleting chapter:", err)
      setError("Network error. Please try again.")
      showError("Network error. Please try again.")
    }
  }

  const handleEdit = (chapter) => {
    setEditingChapter(chapter)
    setTitle(chapter.title)
    setDescription(chapter.description || "")
    setShowCreate(false)
  }

  const handleCancel = () => {
    setShowCreate(false)
    setEditingChapter(null)
    setTitle("")
    setDescription("")
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = chapters.findIndex(c => c.id === active.id)
    const newIndex = chapters.findIndex(c => c.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const newChapters = arrayMove(chapters, oldIndex, newIndex)
    setChapters(newChapters)

    try {
      const updates = newChapters.map((chapter, index) =>
        fetch(`/api/admin/chapter/${chapter.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIndex: index }),
        })
      )
      await Promise.all(updates)
      showSuccess("Chapter order updated!")
    } catch (err) {
      console.error("Error updating chapter order:", err)
      showError("Failed to save new order")
      loadChapters()
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading chapters...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Chapters</h2>
            <p className="text-gray-600 text-sm mt-1">
              Organize modules into chapters. Each chapter contains multiple modules.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 card-surface p-4 bg-red-50 border-red-200 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => {
            setShowCreate(!showCreate)
            setEditingChapter(null)
            setTitle("")
            setDescription("")
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {showCreate || editingChapter ? "Cancel" : "New Chapter"}
        </button>
      </div>

      {(showCreate || editingChapter) && (
        <div className="card-surface p-6 mb-6 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {editingChapter ? "Edit Chapter" : "Create Chapter"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 bg-white"
                placeholder="Chapter title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 bg-white"
                rows={3}
                placeholder="Optional description"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingChapter ? handleUpdate : handleCreate}
                className="btn-primary"
              >
                {editingChapter ? "Update" : "Create"}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {chapters.length === 0 ? (
        <div className="card-surface text-center py-12 border-2 border-dashed border-gray-200">
          <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 font-medium mb-2">No chapters yet</p>
          <p className="text-sm text-gray-400">Click "New Chapter" to create your first chapter</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapters.map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {chapters.map((chapter, index) => (
              <SortableChapterItem
                key={chapter.id}
                chapter={chapter}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
