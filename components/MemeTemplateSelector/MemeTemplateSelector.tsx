"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { MemeTemplate } from "@/types/meme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

type MemeTemplateSelectorProps = {
  templates: MemeTemplate[]
  onSelectTemplate: (template: MemeTemplate) => void
  selectedTemplateId?: string
}

export default function MemeTemplateSelector({
  templates,
  onSelectTemplate,
  selectedTemplateId,
}: MemeTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="absolute left-2.5 top-2.5 size-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[500px] rounded-md border p-2">
        <div className="grid grid-cols-2 gap-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${selectedTemplateId === template.id ? "border-primary" : "border-transparent hover:border-gray-300"
                }`}
              onClick={() => onSelectTemplate(template)}
            >
              <Image
                src={template.url || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-auto object-cover aspect-square"
                width={template.width}
                height={template.height}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                <p className="text-white text-xs truncate">{template.name}</p>
              </div>
            </div>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-2 py-8 text-center text-gray-500">No templates found matching "{searchQuery}"</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

