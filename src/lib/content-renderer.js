"use client"

import Image from 'next/image'

/**
 * ContentRenderer - Renders structured JSON content blocks
 * Used by both admin preview and learner app
 * Supports both old format (sections) and new format (infoBoxes, questions)
 */
export default function ContentRenderer({ content }) {
  if (!content) {
    return <div className="text-gray-500">No content available</div>
  }

  // Handle THEORY module with infoBoxes
  if (content.infoBoxes && Array.isArray(content.infoBoxes)) {
    return (
      <div className="space-y-6">
        {content.infoBoxes.map((box, index) => (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="text-xs text-blue-600 font-semibold mb-2">Info Box #{index + 1}</div>
            {box.content && box.content.sections ? (
              <div className="space-y-3">
                {box.content.sections.map((section, idx) => (
                  <div key={idx}>{renderSection(section)}</div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">No content in this box</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Handle QUESTION module with questions
  if (content.questions && Array.isArray(content.questions)) {
    return (
      <div className="space-y-4">
        {content.questions.map((question, index) => (
          <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-purple-900 mb-2">
              Question #{index + 1}
            </div>
            <div className="text-gray-800 mb-3">{question.text || 'No question text'}</div>
            {question.answerType === 'MCQ' && question.options && (
              <div className="mt-3">
                <div className="text-xs text-gray-600 mb-2">Options:</div>
                <ul className="list-disc list-inside space-y-1">
                  {question.options.map((option, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{option}</li>
                  ))}
                </ul>
              </div>
            )}
            {question.correctAnswer && (
              <div className="mt-3 text-xs text-green-700">
                Correct Answer: {question.correctAnswer}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Handle old format with sections
  if (content.sections && Array.isArray(content.sections)) {
    return (
      <div className="space-y-4">
        {content.sections.map((section, index) => (
          <div key={index}>
            {renderSection(section)}
          </div>
        ))}
      </div>
    )
  }

  return <div className="text-gray-500">No content available</div>
}

function renderSection(section) {
  switch (section.type) {
    case 'heading':
      const HeadingTag = `h${section.level || 1}`
      return (
        <HeadingTag className={`font-bold text-gray-900 mb-2 ${
          section.level === 1 ? 'text-3xl' :
          section.level === 2 ? 'text-2xl' :
          'text-xl'
        }`}>
          {section.text}
        </HeadingTag>
      )

    case 'paragraph':
      return (
        <p className="text-gray-700 mb-4 leading-relaxed">
          {section.text}
        </p>
      )

    case 'bulletList':
      return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
          {section.items?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )

    case 'image':
      return (
        <div className="my-6">
          {section.src ? (
            <Image
              src={section.src}
              alt={section.alt || ''}
              width={section.width || 800}
              height={section.height || 400}
              className="rounded-lg"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-500">
              Image placeholder
            </div>
          )}
        </div>
      )

    case 'callout':
      const calloutType = section.calloutType || section.type || 'info'
      const calloutStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900',
      }
      return (
        <div className={`border-l-4 p-4 rounded mb-4 ${calloutStyles[calloutType] || calloutStyles.info}`}>
          {section.title && (
            <div className="font-semibold mb-2">{section.title}</div>
          )}
          <div>{section.text}</div>
        </div>
      )

    case 'activity':
      return (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 my-6">
          <div className="font-semibold text-purple-900 mb-2">
            {getActivityTitle(section.activityType)}
          </div>
          {section.prompt && (
            <div className="text-purple-800">{section.prompt}</div>
          )}
        </div>
      )

    default:
      return (
        <div className="text-gray-500 italic">
          Unknown content type: {section.type}
        </div>
      )
  }
}

function getActivityTitle(activityType) {
  const titles = {
    reflection_prompt: 'Reflection Prompt',
    journal_entry: 'Journal Entry',
    practice_exercise: 'Practice Exercise',
    quiz_question: 'Quiz Question',
  }
  return titles[activityType] || 'Activity'
}
