"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, EyeOff, GripVertical, BookOpen, HelpCircle } from "lucide-react"
import TheoryModuleEditor from "./TheoryModuleEditor"
import QuestionModuleEditor from "./QuestionModuleEditor"
import { useToast } from "@/hooks/useToast"

const MODULE_TYPES = [
  { value: 'THEORY', label: 'Theory', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: BookOpen },
  { value: 'QUESTION', label: 'Question', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: HelpCircle },
]

export default function ModulesTab() {
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newModuleType, setNewModuleType] = useState('THEORY')
  const { showSuccess, showError: showErrorToast } = useToast()

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
        setModules(courseData.modules || [])
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

  const handleCreateModule = async () => {
    if (!course) {
      setError("No course available.")
      return
    }

    try {
      setError(null)
      const defaultContent = newModuleType === 'THEORY' 
        ? { infoBoxes: [] }
        : { questions: [] }

      const response = await fetch("/api/admin/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          title: `New ${newModuleType} Module`,
          type: newModuleType,
          content: defaultContent,
        }),
      })

      if (response.ok) {
        const newModule = await response.json()
        setModules([...modules, newModule])
        setSelectedModule(newModule)
        setShowCreate(false)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create module")
      }
    } catch (err) {
      console.error("Error creating module:", err)
      setError("Network error. Please try again.")
    }
  }

  const handleDelete = async (moduleId) => {
    if (!confirm("Are you sure you want to delete this module? This cannot be undone.")) return

    try {
      setError(null)
      const response = await fetch(`/api/admin/module/${moduleId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setModules(modules.filter(m => m.id !== moduleId))
        if (selectedModule?.id === moduleId) {
          setSelectedModule(null)
        }
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete module")
      }
    } catch (err) {
      console.error("Error deleting module:", err)
      setError("Network error. Please try again.")
    }
  }

  const handleSave = async (updatedModule) => {
    setModules(modules.map(m => m.id === updatedModule.id ? updatedModule : m))
    setSelectedModule(updatedModule)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading modules...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Modules</h2>
        <p className="text-gray-600">Create and manage course modules</p>
      </div>

      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Left Sidebar - Module List */}
        <div className="w-80 flex-shrink-0">
          <div className="card-surface p-4 mb-4">
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Module
            </button>
            
            {showCreate && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Module Type
                </label>
                <select
                  value={newModuleType}
                  onChange={(e) => setNewModuleType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {MODULE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleCreateModule}
                  className="w-full px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 text-sm font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            )}
          </div>

          <div className="card-surface p-4 overflow-auto h-[calc(100vh-320px)]">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            {modules.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-medium mb-1">No modules yet</p>
                <p className="text-xs">Click "New Module" to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {modules.map((module) => {
                  const moduleType = MODULE_TYPES.find(t => t.value === module.type) || MODULE_TYPES[0]
                  const Icon = moduleType.icon
                  return (
                    <div
                      key={module.id}
                      onClick={() => setSelectedModule(module)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedModule?.id === module.id
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${moduleType.color.split(' ')[1]}`} />
                            <div className="font-semibold text-sm text-gray-900 truncate">
                              {module.title}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${moduleType.color}`}>
                              {moduleType.label}
                            </span>
                            <span className="text-xs text-gray-500">#{module.orderIndex + 1}</span>
                            {!module.published && (
                              <span className="text-xs text-gray-400 italic">(Draft)</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {module.published ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(module.id)
                            }}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Editor */}
        <div className="flex-1 min-w-0">
          {selectedModule ? (
            <div className="card-surface h-full overflow-hidden flex flex-col">
              {selectedModule.type === 'THEORY' ? (
                <TheoryModuleEditor module={selectedModule} onSave={handleSave} />
              ) : (
                <QuestionModuleEditor module={selectedModule} onSave={handleSave} />
              )}
            </div>
          ) : (
            <div className="card-surface h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No module selected</p>
                <p className="text-sm">Select a module from the list or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
