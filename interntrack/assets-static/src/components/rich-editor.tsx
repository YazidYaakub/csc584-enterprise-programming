import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { MenuBar } from '@/components/menu-bar'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Placeholder.configure({
    placeholder: 'Start writing your content here...',
    emptyEditorClass: 'is-editor-empty'
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false
    }
  })
]

type RichEditorProps = {
  content: string | undefined
  onUpdate: (content: string) => void
  mode: 'view' | 'edit'
}

export function RichEditor(props: RichEditorProps) {
  const { content, onUpdate, mode } = props

  return (
    <div className="space-y-2 rounded border border-gray-200 p-2">
      <EditorProvider
        editable={mode === 'edit'}
        slotBefore={mode === 'edit' ? <MenuBar /> : null}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => onUpdate(editor.getHTML())}
      ></EditorProvider>
    </div>
  )
}
