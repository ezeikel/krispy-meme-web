"use client"

import type { TextBox } from "@/types/meme"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFont, faArrowsUpDownLeftRight, faFillDrip } from "@fortawesome/free-solid-svg-icons"

type TextEditorProps = {
  textBox: TextBox
  onUpdate: (updates: Partial<TextBox>) => void
}

export default function TextEditor({ textBox, onUpdate }: TextEditorProps) {
  return (
    <Tabs defaultValue="content">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="content">
          <FontAwesomeIcon icon={faFont} className="size-4 mr-2" /> Content
        </TabsTrigger>
        <TabsTrigger value="style">
          <FontAwesomeIcon icon={faFillDrip} className="size-4 mr-2" /> Style
        </TabsTrigger>
        <TabsTrigger value="position">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="size-4 mr-2" /> Position
        </TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="text-content">Text Content</Label>
          <Input
            id="text-content"
            value={textBox.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Enter your text here"
          />
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size: {textBox.fontSize}px</Label>
          <Slider
            id="font-size"
            min={12}
            max={72}
            step={1}
            value={[textBox.fontSize]}
            onValueChange={(value) => onUpdate({ fontSize: value[0] })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="text-color">Text Color</Label>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded border" style={{ backgroundColor: textBox.color }} />
            <Input
              id="text-color"
              type="color"
              value={textBox.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-full h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outline-color">Outline Color</Label>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded border" style={{ backgroundColor: textBox.outlineColor }} />
            <Input
              id="outline-color"
              type="color"
              value={textBox.outlineColor}
              onChange={(e) => onUpdate({ outlineColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outline-width">Outline Width: {textBox.outlineWidth}px</Label>
          <Slider
            id="outline-width"
            min={0}
            max={10}
            step={1}
            value={[textBox.outlineWidth]}
            onValueChange={(value) => onUpdate({ outlineWidth: value[0] })}
          />
        </div>
      </TabsContent>

      <TabsContent value="position" className="space-y-4 pt-4">
        <div className="bg-muted/30 p-3 rounded-md border border-muted">
          <p className="text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="size-4" />
            <span>
              <strong>Drag directly on canvas:</strong> Click and drag the text directly on the meme to reposition it.
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position-x">X Position: {Math.round(textBox.x)}</Label>
          <Slider
            id="position-x"
            min={0}
            max={600}
            step={1}
            value={[textBox.x]}
            onValueChange={(value) => onUpdate({ x: value[0] })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position-y">Y Position: {Math.round(textBox.y)}</Label>
          <Slider
            id="position-y"
            min={0}
            max={600}
            step={1}
            value={[textBox.y]}
            onValueChange={(value) => onUpdate({ y: value[0] })}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

