"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TipTapEditor from "@/components/TipTapEditor"
import ContentRenderer from "@/lib/content-renderer"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, Trash2, Eye, EyeOff, LogOut } from "lucide-react"
import { convertContentToTipTap, convertTipTapToContent } from "@/lib/content-converter"

const MODULE_TYPES = ['THEORY', 'PRACTICE', 'QUIZ']

function SortableModuleItem({ module, onSelect, onDelete, isSelected }) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 mb-2 rounded border cursor-pointer ${
        isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(module)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-medium text-sm">{module.title}</div>
          <div className="text-xs text-gray-500 mt-1">
            {module.type} • Order: {module.orderIndex}
          </div>
        </div>
        <div className="flex gap-1">
          {module.published ? (
            <Eye className="w-4 h-4 text-green-500" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-400" />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(module.id)
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminCMS() {
  const router = useRouter()
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")
  const [moduleType, setModuleType] = useState("THEORY")
  const [editorContent, setEditorContent] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    checkAuth()
    loadCourse()
  }, [])

  useEffect(() => {
    if (selectedModule) {
      setTitle(selectedModule.title)
      setModuleType(selectedModule.type)
      // Convert structured content to TipTap format
      const tiptapContent = convertContentToTipTap(selectedModule.content)
      setEditorContent(tiptapContent)
    } else {
      setTitle("")
      setModuleType("THEORY")
      setEditorContent({ type: 'doc', content: [] })
    }
  }, [selectedModule])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/check", { credentials: "include" })
      if (!response.ok) {
        router.push("/admin-cms/login")
      }
    } catch (err) {
      router.push("/admin-cms/login")
    }
  }

  const loadCourse = async () => {
    try {
      // For now, use the seeded course
      const response = await fetch("/api/course/dewbloom-dbt")
      if (response.ok) {
        const courseData = await response.json()
        setCourse(courseData)
        setModules(courseData.modules || [])
      }
    } catch (err) {
      console.error("Error loading course:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateModule = async () => {
    if (!course) return

    try {
      const response = await fetch("/api/admin/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          title: "New Module",
          type: "THEORY",
          content: { sections: [] },
        }),
      })

      if (response.ok) {
        const newModule = await response.json()
        setModules([...modules, newModule])
        setSelectedModule(newModule)
      }
    } catch (err) {
      console.error("Error creating module:", err)
    }
  }

  const handleSave = async (tiptapJson) => {
    if (!selectedModule) return

    setSaving(true)
    try {
      // Convert TipTap JSON to structured content
      const structuredContent = convertTipTapToContent(tiptapJson)

      const response = await fetch(`/api/admin/module/${selectedModule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type: moduleType,
          content: structuredContent,
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        setModules(modules.map(m => m.id === updated.id ? updated : m))
        setSelectedModule(updated)
      }
    } catch (err) {
      console.error("Error saving module:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (moduleId) => {
    if (!confirm("Are you sure you want to delete this module?")) return

    try {
      const response = await fetch(`/api/admin/module/${moduleId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setModules(modules.filter(m => m.id !== moduleId))
        if (selectedModule?.id === moduleId) {
          setSelectedModule(null)
        }
      }
    } catch (err) {
      console.error("Error deleting module:", err)
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = modules.findIndex(m => m.id === active.id)
      const newIndex = modules.findIndex(m => m.id === over.id)

      const newModules = arrayMove(modules, oldIndex, newIndex)
      setModules(newModules)

      // Update orderIndex for all affected modules
      for (let i = 0; i < newModules.length; i++) {
        if (newModules[i].orderIndex !== i) {
          await fetch(`/api/admin/module/${newModules[i].id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderIndex: i }),
          })
        }
      }
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin-cms/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin CMS</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Column - Module List */}
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleCreateModule}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              New Module
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={modules.map(m => m.id)}
                strategy={verticalListSortingStrategy}
              >
                {modules.map((module) => (
                  <SortableModuleItem
                    key={module.id}
                    module={module}
                    onSelect={setSelectedModule}
                    onDelete={handleDelete}
                    isSelected={selectedModule?.id === module.id}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Center Column - Editor */}
        <div className="flex-1 border-r border-gray-200 bg-white flex flex-col">
          {selectedModule ? (
            <>
              <div className="p-4 border-b border-gray-200 space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Module title"
                />
                <select
                  value={moduleType}
                  onChange={(e) => setModuleType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {MODULE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 overflow-hidden">
                <TipTapEditor
                  content={editorContent}
                  onChange={setEditorContent}
                  onSave={handleSave}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a module to edit
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="w-96 bg-gray-50 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="font-semibold text-gray-900">Live Preview</h2>
          </div>
          <div className="flex-1 overflow-auto p-6">
            {selectedModule ? (
              <ContentRenderer content={selectedModule.content} />
            ) : (
              <div className="text-gray-500 text-center mt-8">
                Preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
