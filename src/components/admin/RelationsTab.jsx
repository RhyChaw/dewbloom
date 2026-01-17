"use client"

import { useState, useEffect } from "react"
import { Network, ArrowRight, Layers, BookOpen, GitBranch } from "lucide-react"

export default function RelationsTab() {
  const [course, setCourse] = useState(null)
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setError(null)
      
      // Load course with modules and chapters
      const courseResponse = await fetch("/api/course/dewbloom-dbt")
      if (courseResponse.ok) {
        const courseData = await courseResponse.json()
        setCourse(courseData)
        // Extract chapters from course data
        if (courseData.chapters) {
          setChapters(courseData.chapters)
        }
      } else {
        // Fallback: try loading chapters separately
        const chaptersResponse = await fetch("/api/admin/chapters?courseSlug=dewbloom-dbt")
        if (chaptersResponse.ok) {
          const chaptersData = await chaptersResponse.json()
          setChapters(chaptersData.chapters || [])
        }
      }
    } catch (err) {
      console.error("Error loading data:", err)
      setError(`Failed to load data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading relations...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  // Group modules by chapter
  // Modules are already organized in course.chapters[].modules
  const modulesByChapter = {}
  const allModuleIds = new Set()
  const unassignedModules = []

  // First, collect modules from chapters
  if (course.chapters) {
    course.chapters.forEach(chapter => {
      if (chapter.modules && chapter.modules.length > 0) {
        modulesByChapter[chapter.id] = chapter.modules
        // Track which modules are assigned
        chapter.modules.forEach(module => {
          allModuleIds.add(module.id)
        })
      }
    })
  }

  // Then, collect unassigned modules (modules not in any chapter)
  if (course.modules) {
    course.modules.forEach(module => {
      if (!allModuleIds.has(module.id)) {
        unassignedModules.push(module)
      }
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Relations</h2>
            <p className="text-gray-600 text-sm mt-1">
              View how chapters, modules, and submodules are related
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 card-surface p-4 bg-red-50 border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Course Overview */}
      <div className="card-surface p-6 mb-6 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
            <p className="text-sm text-gray-600">
              {chapters.length} chapter(s) • {course.modules?.length || 0} module(s)
            </p>
          </div>
        </div>
      </div>

      {/* Chapters and Modules */}
      <div className="space-y-6">
        {chapters.map((chapter) => {
          const chapterModules = modulesByChapter[chapter.id] || []
          return (
            <div key={chapter.id} className="card-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                  {chapter.description && (
                    <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                  )}
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {chapterModules.length} module(s)
                </span>
              </div>

              {chapterModules.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No modules assigned to this chapter
                </div>
              ) : (
                <div className="space-y-4 pl-8 border-l-2 border-purple-200">
                  {chapterModules.map((module) => (
                    <div key={module.id} className="card-surface p-4 bg-gray-50">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              module.type === 'THEORY' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {module.type}
                            </span>
                            <span className="text-xs text-gray-500">Order: #{module.orderIndex + 1}</span>
                          </div>

                          {/* Submodules */}
                          {module.submodules && Array.isArray(module.submodules) && module.submodules.length > 0 && (
                            <div className="mt-3 pl-4 border-l-2 border-blue-200">
                              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                                Submodules:
                              </div>
                              <div className="space-y-2">
                                {module.submodules.map((submodule, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 bg-blue-50 p-2 rounded-lg">
                                    <span className="font-medium">Page {submodule.pageNumber}:</span>{" "}
                                    {submodule.boxes?.length || 0} box(es)
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Questions */}
                          {module.type === 'QUESTION' && module.content?.questions && (
                            <div className="mt-3 pl-4 border-l-2 border-purple-200">
                              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                                Questions:
                              </div>
                              <div className="text-sm text-gray-700 bg-purple-50 p-2 rounded-lg">
                                {module.content.questions.length} question(s)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Unassigned Modules */}
        {unassignedModules.length > 0 && (
          <div className="card-surface p-6 border-2 border-yellow-200 bg-yellow-50">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-900">Unassigned Modules</h3>
              <span className="ml-auto text-sm text-gray-500">
                {unassignedModules.length} module(s)
              </span>
            </div>
            <div className="space-y-2 pl-8">
              {unassignedModules.map((module) => (
                <div key={module.id} className="text-sm text-gray-700">
                  <span className="font-medium">{module.title}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    module.type === 'THEORY' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {module.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
