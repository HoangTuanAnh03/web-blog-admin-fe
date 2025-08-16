"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Underline,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  className,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)
  const [previewContent, setPreviewContent] = useState("")

  // Update preview content when value changes
  useEffect(() => {
    // Convert markdown-like syntax to HTML for preview
    const content = value
      .replace(/# (.*?)$/gm, "<h1>$1</h1>")
      .replace(/## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/### (.*?)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
      .replace(/^> (.*?)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^- (.*?)$/gm, "<li>$1</li>")
      .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>")
      .replace(/^(\d+)\. (.*?)$/gm, "<li>$2</li>")
      .replace(/<li>(.*?)<\/li>/g, "<ol><li>$1</li></ol>")
      .replace(/\n\n/g, "<br /><br />")

    setPreviewContent(content)
  }, [value])

  const handleCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef) return

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      let newText = ""
      switch (command) {
        case "bold":
          newText = `**${selectedText}**`
          break
        case "italic":
          newText = `*${selectedText}*`
          break
        case "underline":
          newText = `__${selectedText}__`
          break
        case "heading1":
          newText = `# ${selectedText}`
          break
        case "heading2":
          newText = `## ${selectedText}`
          break
        case "heading3":
          newText = `### ${selectedText}`
          break
        case "quote":
          newText = `> ${selectedText}`
          break
        case "code":
          newText = `\`${selectedText}\``
          break
        case "link":
          newText = `[${selectedText}](https://example.com)`
          break
        case "image":
          newText = `![Image description](https://example.com/image.jpg)`
          break
        case "bulletList":
          newText = selectedText
            .split("\n")
            .map((line) => `- ${line}`)
            .join("\n")
          break
        case "numberedList":
          newText = selectedText
            .split("\n")
            .map((line, i) => `${i + 1}. ${line}`)
            .join("\n")
          break
        default:
          return
      }

      // Replace the selected text with the formatted text
      const textArea = editorRef.querySelector("textarea")
      if (textArea) {
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        const currentValue = textArea.value

        const newValue = currentValue.substring(0, start) + newText + currentValue.substring(end)
        onChange(newValue)

        // Set cursor position after the operation
        setTimeout(() => {
          textArea.focus()
          textArea.setSelectionRange(start + newText.length, start + newText.length)
        }, 0)
      }
    },
    [editorRef, onChange],
  )

  return (
    <div className={cn("border rounded-md", className)} ref={setEditorRef}>
      <div className="flex items-center gap-1 p-1 border-b overflow-x-auto">
        <Button variant="ghost" size="icon" onClick={() => handleCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="icon" onClick={() => handleCommand("heading1")} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("heading2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("heading3")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="icon" onClick={() => handleCommand("bulletList")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("numberedList")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("quote")} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("code")} title="Code">
          <Code className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="icon" onClick={() => handleCommand("link")} title="Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleCommand("image")} title="Image">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="icon" onClick={() => onChange("")} title="Clear">
          <Undo2 className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")}>
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="write"
            className="rounded-none border-b-2 border-b-transparent py-2 data-[state=active]:border-b-primary"
          >
            Write
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="rounded-none border-b-2 border-b-transparent py-2 data-[state=active]:border-b-primary"
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="p-0 mt-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] border-0 focus-visible:ring-0 resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 mt-0">
          {previewContent ? (
            <div
              className="prose prose-stone dark:prose-invert max-w-none min-h-[300px]"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            />
          ) : (
            <div className="text-muted-foreground min-h-[300px] flex items-center justify-center">
              Nothing to preview
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
