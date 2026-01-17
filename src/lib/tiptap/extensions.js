import { Node, mergeAttributes } from '@tiptap/core'

// Custom Activity Block
export const Activity = Node.create({
  name: 'activity',
  
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  addAttributes() {
    return {
      activityType: {
        default: 'reflection_prompt',
      },
      prompt: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="activity"]',
        getAttrs: (node) => {
          if (typeof node === 'string') return false
          return {
            activityType: node.getAttribute('data-activity-type') || 'reflection_prompt',
            prompt: node.getAttribute('data-prompt') || '',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 
      'data-type': 'activity',
      'data-activity-type': HTMLAttributes.activityType,
      'data-prompt': HTMLAttributes.prompt,
    }), 0]
  },
})

// Custom Callout Block
export const Callout = Node.create({
  name: 'callout',
  
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  addAttributes() {
    return {
      calloutType: {
        default: 'info',
      },
      title: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
        getAttrs: (node) => {
          if (typeof node === 'string') return false
          return {
            calloutType: node.getAttribute('data-callout-type') || 'info',
            title: node.getAttribute('data-title') || '',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 
      'data-type': 'callout',
      'data-callout-type': HTMLAttributes.calloutType,
      'data-title': HTMLAttributes.title,
    }), 0]
  },
})
