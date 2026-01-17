/**
 * Converts TipTap JSON to structured content format
 */
export function convertTipTapToContent(tiptapJson) {
  // Handle empty or invalid input
  if (!tiptapJson) {
    return { sections: [] }
  }

  // If it's already structured (has sections, infoBoxes, or questions), return as-is
  if (tiptapJson.sections || tiptapJson.infoBoxes || tiptapJson.questions) {
    return tiptapJson
  }

  // If it doesn't have content array, return empty sections
  if (!tiptapJson.content || !Array.isArray(tiptapJson.content)) {
    return { sections: [] }
  }

  const sections = []

  function processNode(node) {
    if (node.type === 'heading') {
      sections.push({
        type: 'heading',
        level: node.attrs?.level || 1,
        text: extractText(node),
      })
    } else if (node.type === 'paragraph') {
      const text = extractText(node)
      if (text.trim()) {
        sections.push({
          type: 'paragraph',
          text: text,
        })
      }
    } else if (node.type === 'bulletList') {
      const items = []
      if (node.content) {
        node.content.forEach((item) => {
          if (item.type === 'listItem') {
            const itemText = extractText(item)
            if (itemText.trim()) {
              items.push(itemText)
            }
          }
        })
      }
      if (items.length > 0) {
        sections.push({
          type: 'bulletList',
          items: items,
        })
      }
    } else if (node.type === 'image') {
      sections.push({
        type: 'image',
        src: node.attrs?.src || '',
        alt: node.attrs?.alt || '',
        width: node.attrs?.width || 800,
        height: node.attrs?.height || 400,
      })
    } else if (node.type === 'callout') {
      sections.push({
        type: 'callout',
        calloutType: node.attrs?.calloutType || 'info',
        title: node.attrs?.title || '',
        text: extractText(node),
      })
    } else if (node.type === 'activity') {
      sections.push({
        type: 'activity',
        activityType: node.attrs?.activityType || 'reflection_prompt',
        prompt: node.attrs?.prompt || '',
      })
    }

    // Process child nodes
    if (node.content) {
      node.content.forEach((child) => processNode(child))
    }
  }

  // Process all top-level nodes
  tiptapJson.content.forEach((node) => processNode(node))

  return { sections }
}

function extractText(node) {
  if (node.type === 'text') {
    return node.text || ''
  }
  
  if (node.content) {
    return node.content
      .map((child) => extractText(child))
      .join('')
  }
  
  return ''
}

/**
 * Converts structured content to TipTap JSON
 */
export function convertContentToTipTap(content) {
  if (!content || !content.sections) {
    return {
      type: 'doc',
      content: [],
    }
  }

  const nodes = content.sections.map((section) => {
    switch (section.type) {
      case 'heading':
        return {
          type: 'heading',
          attrs: { level: section.level || 1 },
          content: [{ type: 'text', text: section.text || '' }],
        }
      case 'paragraph':
        return {
          type: 'paragraph',
          content: [{ type: 'text', text: section.text || '' }],
        }
      case 'bulletList':
        return {
          type: 'bulletList',
          content: (section.items || []).map((item) => ({
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: item }] }],
          })),
        }
      case 'image':
        return {
          type: 'image',
          attrs: {
            src: section.src || '',
            alt: section.alt || '',
            width: section.width || 800,
            height: section.height || 400,
          },
        }
      case 'callout':
        return {
          type: 'callout',
          attrs: {
            calloutType: section.calloutType || section.type || 'info',
            title: section.title || '',
          },
          content: [{ type: 'paragraph', content: [{ type: 'text', text: section.text || '' }] }],
        }
      case 'activity':
        return {
          type: 'activity',
          attrs: {
            activityType: section.activityType || 'reflection_prompt',
            prompt: section.prompt || '',
          },
        }
      default:
        return null
    }
  }).filter(Boolean)

  return {
    type: 'doc',
    content: nodes,
  }
}
