"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faDownload, faTrash, faFont, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import MemeTemplateSelector from "../MemeTemplateSelector/MemeTemplateSelector"
import TextEditor from "../TextEditor/TextEditor"
import type { MemeTemplate, TextBox } from "@/types/meme"
import { defaultMemeTemplates } from "@/data/memeTemplates.ts"

export default function MemeGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null)
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([])
  const [selectedTextBoxId, setSelectedTextBoxId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 })

  // Add this state for tracking drag offset
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Select a template
  const handleSelectTemplate = (template: MemeTemplate) => {
    setSelectedTemplate(template)

    // Initialize text boxes based on template default positions
    if (template.defaultTextPositions) {
      setTextBoxes(
        template.defaultTextPositions.map((pos, index) => ({
          id: `text-${index}`,
          text: `Text ${index + 1}`,
          x: pos.x,
          y: pos.y,
          fontSize: 36,
          color: "#FFFFFF",
          outlineColor: "#000000",
          outlineWidth: 4,
          isDragging: false,
          width: 300,
          height: 50,
        })),
      )
    } else {
      // Reset text boxes if no default positions
      setTextBoxes([])
    }
  }

  // Add a new text box
  const handleAddTextBox = () => {
    const newTextBox: TextBox = {
      id: `text-${textBoxes.length}`,
      text: `Text ${textBoxes.length + 1}`,
      x: canvasSize.width / 2 - 150,
      y: canvasSize.height / 2,
      fontSize: 36,
      color: "#FFFFFF",
      outlineColor: "#000000",
      outlineWidth: 4,
      isDragging: false,
      width: 300,
      height: 50,
    }

    setTextBoxes([...textBoxes, newTextBox])
    setSelectedTextBoxId(newTextBox.id)
  }

  // Delete a text box
  const handleDeleteTextBox = (id: string) => {
    setTextBoxes(textBoxes.filter((box) => box.id !== id))
    if (selectedTextBoxId === id) {
      setSelectedTextBoxId(null)
    }
  }

  // Update text box properties
  const updateTextBox = (id: string, updates: Partial<TextBox>) => {
    setTextBoxes(textBoxes.map((box) => (box.id === id ? { ...box, ...updates } : box)))
  }

  // Handle text box selection
  const handleTextBoxSelect = (id: string) => {
    setSelectedTextBoxId(id)
  }

  // Update the handleMouseDown function to make it clearer and more robust for all text boxes
  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is inside any text box
    const clickedBox = textBoxes.find((box) => {
      return x >= box.x - box.width / 2 && x <= box.x + box.width / 2 && y >= box.y - box.height && y <= box.y
    })

    if (clickedBox) {
      // Mark this text box as being dragged
      updateTextBox(clickedBox.id, { isDragging: true })
      setSelectedTextBoxId(clickedBox.id)

      // Store the offset between click position and text box center
      const offsetX = x - clickedBox.x
      const offsetY = y - clickedBox.y
      setDragOffset({ x: offsetX, y: offsetY })
    } else {
      setSelectedTextBoxId(null)
    }
  }

  // Update the handleMouseMove function to use the offset
  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const draggingBox = textBoxes.find((box) => box.isDragging)
    if (draggingBox) {
      // Use the stored offset to maintain the relative position
      updateTextBox(draggingBox.id, {
        x: x - dragOffset.x,
        y: y - dragOffset.y,
      })
    }
  }

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setTextBoxes(textBoxes.map((box) => ({ ...box, isDragging: false })))
  }

  // Download the meme
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "krispy-meme.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  // Reset the editor
  const handleReset = () => {
    setSelectedTemplate(null)
    setTextBoxes([])
    setSelectedTextBoxId(null)
  }

  // Draw the meme on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !selectedTemplate) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Load the template image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = selectedTemplate.url

    img.onload = () => {
      // Set canvas size based on image aspect ratio
      const aspectRatio = img.width / img.height
      let newWidth = canvasSize.width
      let newHeight = canvasSize.width / aspectRatio

      if (newHeight > canvasSize.height) {
        newHeight = canvasSize.height
        newWidth = canvasSize.height * aspectRatio
      }

      canvas.width = newWidth
      canvas.height = newHeight
      setCanvasSize({ width: newWidth, height: newHeight })

      // Draw image
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Draw text boxes
      textBoxes.forEach((box) => {
        ctx.font = `${box.fontSize}px Impact, sans-serif`
        ctx.textAlign = "center"

        // Draw text outline
        ctx.lineWidth = box.outlineWidth
        ctx.strokeStyle = box.outlineColor
        ctx.strokeText(box.text, box.x, box.y)

        // Draw text fill
        ctx.fillStyle = box.color
        ctx.fillText(box.text, box.x, box.y)

        // Draw selection box if selected
        if (box.id === selectedTextBoxId) {
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.strokeRect(box.x - box.width / 2, box.y - box.height, box.width, box.height)
          ctx.setLineDash([])

          // Add handles to make it clear this is draggable
          ctx.fillStyle = "#3b82f6"
          const handleSize = 6

          // Draw handles at corners and midpoints
          const handles = [
            { x: box.x - box.width / 2, y: box.y - box.height }, // top-left
            { x: box.x + box.width / 2, y: box.y - box.height }, // top-right
            { x: box.x - box.width / 2, y: box.y }, // bottom-left
            { x: box.x + box.width / 2, y: box.y }, // bottom-right
            { x: box.x, y: box.y - box.height / 2 }, // center
          ]

          handles.forEach((handle) => {
            ctx.fillRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize)
          })
        }
      })
    }
  }, [selectedTemplate, textBoxes, selectedTextBoxId, canvasSize, dragOffset])

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="max-w-full border border-gray-200 rounded mx-auto"
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            {!selectedTemplate && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 rounded">
                <p className="text-gray-500 text-lg">Select a template to get started</p>
              </div>
            )}
          </div>

          {selectedTemplate && textBoxes.length > 0 && (
            <div className="bg-muted/30 p-2 rounded-md border border-muted text-center">
              <p className="text-sm text-muted-foreground">
                <FontAwesomeIcon icon={faFont} className="mr-2" />
                Click and drag any text to reposition it on the meme
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={handleAddTextBox} disabled={!selectedTemplate}>
              <FontAwesomeIcon icon={faPlus} className="size-4 mr-2" /> Add Text
            </Button>
            <Button onClick={handleDownload} disabled={!selectedTemplate} variant="default">
              <FontAwesomeIcon icon={faDownload} className="size-4 mr-2" /> Download
            </Button>
            <Button onClick={handleReset} variant="outline">
              <FontAwesomeIcon icon={faArrowsRotate} className="size-4 mr-2" /> Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <Tabs defaultValue="templates">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="text" disabled={!selectedTemplate}>
              Text Editor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <MemeTemplateSelector
              templates={defaultMemeTemplates}
              onSelectTemplate={handleSelectTemplate}
              selectedTemplateId={selectedTemplate?.id}
            />
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            {textBoxes.length > 0 ? (
              <>
                <div className="space-y-2">
                  <Label>Select Text to Edit</Label>
                  <div className="space-y-2">
                    {textBoxes.map((box) => (
                      <div
                        key={box.id}
                        className={`flex items-center p-2 border rounded cursor-pointer ${selectedTextBoxId === box.id ? "border-primary bg-primary/10" : "border-gray-200"
                          }`}
                        onClick={() => handleTextBoxSelect(box.id)}
                      >
                        <FontAwesomeIcon icon={faFont} className="size-4 mr-2" />
                        <span className="flex-1 truncate">{box.text || "Empty text"}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteTextBox(box.id)
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTextBoxId && (
                  <TextEditor
                    textBox={textBoxes.find((box) => box.id === selectedTextBoxId)!}
                    onUpdate={(updates) => updateTextBox(selectedTextBoxId, updates)}
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 mb-4">No text boxes added yet</p>
                <Button onClick={handleAddTextBox}>
                  <FontAwesomeIcon icon={faPlus} className="size-4 mr-2" /> Add Text
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

