import { Color } from '@tiptap/extension-color'
import { Placeholder } from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './menu-bar'

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
}

export function RichEditor(props: RichEditorProps) {
  const { content, onUpdate } = props

  return (
    <div className='border border-gray-200 space-y-2 p-2 rounded'>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => onUpdate(editor.getHTML())}
      ></EditorProvider>
    </div>
  )
}
