"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash2, GripVertical } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useToast } from "@/hooks/useToast"

function SortableQuestion({ question, index, onUpdate, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: `question-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="card-surface p-5 mb-4 border-2 border-purple-100">
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-purple-600 transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg inline-block">
            Question #{index + 1}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question Text
            </label>
            <textarea
              value={question.text || ''}
              onChange={(e) => onUpdate(index, { ...question, text: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
              rows={3}
              placeholder="Enter question text..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Answer Type
            </label>
            <select
              value={question.answerType || 'MCQ'}
              onChange={(e) => onUpdate(index, { ...question, answerType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            >
              <option value="MCQ">Multiple Choice (MCQ)</option>
              <option value="FILL_IN_BLANK">Fill in the Blank</option>
            </select>
          </div>

          {question.answerType === 'MCQ' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Options (one per line)
              </label>
              <textarea
                value={question.options?.join('\n') || ''}
                onChange={(e) => onUpdate(index, {
                  ...question,
                  options: e.target.value.split('\n').filter(o => o.trim())
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-mono text-sm"
                rows={4}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correct Answer (optional)
            </label>
            <input
              type="text"
              value={question.correctAnswer || ''}
              onChange={(e) => onUpdate(index, { ...question, correctAnswer: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
              placeholder="Enter correct answer..."
            />
          </div>
        </div>
        <button
          onClick={() => onDelete(index)}
          className="p-2 hover:bg-red-100 rounded-xl text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function QuestionModuleEditor({ module, onSave }) {
  const [title, setTitle] = useState(module.title)
  const [questions, setQuestions] = useState([])
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
    if (module.content && module.content.questions) {
      setQuestions(module.content.questions)
    } else {
      setQuestions([])
    }
  }, [module])

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      text: '',
      answerType: 'MCQ',
      options: [],
      correctAnswer: '',
    }])
  }

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions]
    newQuestions[index] = updatedQuestion
    setQuestions(newQuestions)
  }

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-')[1])
      const newIndex = parseInt(over.id.split('-')[1])
      setQuestions(arrayMove(questions, oldIndex, newIndex))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/module/${module.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: {
            questions: questions,
          },
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        onSave(updated)
        showSuccess("Module saved successfully!")
        setError(null)
      } else {
        const data = await response.json()
        const errorMsg = data.error || data.details || "Failed to save module"
        setError(errorMsg)
        showError(errorMsg)
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
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
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

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Questions</h3>
          <button
            onClick={handleAddQuestion}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="card-surface text-center py-12 border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium mb-2">No questions yet</p>
            <p className="text-sm text-gray-400">Click "Add Question" to create your first question</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions.map((_, i) => `question-${i}`)}
              strategy={verticalListSortingStrategy}
            >
              {questions.map((question, index) => (
                <SortableQuestion
                  key={index}
                  question={question}
                  index={index}
                  onUpdate={handleUpdateQuestion}
                  onDelete={handleDeleteQuestion}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}
