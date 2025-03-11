export type MemeTemplate = {
  id: string
  name: string
  url: string
  width: number
  height: number
  defaultTextPositions?: {
    x: number
    y: number
  }[]
}

export type TextBox = {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  outlineColor: string
  outlineWidth: number
  isDragging: boolean
  width: number
  height: number
}

