import { useCurrentEditor } from '@tiptap/react'
import {
  Bold,
  Circle,
  Code,
  CornerDownLeft,
  FileCode2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo,
  Strikethrough,
  Undo
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export function MenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="space-x-1">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        size="icon"
      >
        <Bold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        size="icon"
      >
        <Italic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        variant={editor.isActive('strike') ? 'default' : 'outline'}
        size="icon"
      >
        <Strikethrough />
      </Button>
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</Button> */}
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive('paragraph') ? 'default' : 'outline'}
        size="icon"
      >
        <Pilcrow />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading1 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading3 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading4 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        variant={editor.isActive('heading', { level: 5 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading5 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        variant={editor.isActive('heading', { level: 6 }) ? 'default' : 'outline'}
        size="icon"
      >
        <Heading6 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        size="icon"
      >
        <List />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive('orderedList') ? 'default' : 'outline'}
        size="icon"
      >
        <ListOrdered />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive('code') ? 'default' : 'outline'}
        size="icon"
      >
        <Code />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
        size="icon"
      >
        <FileCode2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive('blockquote') ? 'default' : 'outline'}
        size="icon"
      >
        <Quote />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <CornerDownLeft />
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        variant="outline"
        size="icon"
      >
        <Undo />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        variant="outline"
        size="icon"
      >
        <Redo />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        variant={editor.isActive('textStyle', { color: '#958DF1' }) ? 'default' : 'outline'}
        size="icon"
      >
        <Circle className="fill-current text-purple-400" />
      </Button>
    </div>
  )
}
