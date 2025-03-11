import type { MemeTemplate } from '@/types/meme';

export const defaultMemeTemplates: MemeTemplate[] = [
  {
    id: 'drake',
    name: 'Drake Hotline Bling',
    url: '/images/templates/drake-hotline-bling.jpg',
    width: 600,
    height: 600,
    defaultTextPositions: [
      { x: 450, y: 150 },
      { x: 450, y: 450 },
    ],
  },
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Boyfriend',
    url: '/images/templates/distracted-boyfriend.jpg',
    width: 600,
    height: 400,
    defaultTextPositions: [
      { x: 160, y: 215 },
      { x: 360, y: 170 },
      { x: 500, y: 215 },
    ],
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    url: '/images/templates/two-buttons.jpg',
    width: 500,
    height: 600,
    defaultTextPositions: [
      { x: 150, y: 100 },
      { x: 350, y: 100 },
      { x: 250, y: 500 },
    ],
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    url: '/images/templates/change-my-mind.jpg',
    width: 600,
    height: 400,
    defaultTextPositions: [{ x: 300, y: 250 }],
  },
  {
    id: 'futurama-fry',
    name: 'Futurama Fry',
    url: '/images/templates/futurama-fry.jpg',
    width: 500,
    height: 500,
    defaultTextPositions: [
      { x: 250, y: 80 },
      { x: 250, y: 420 },
    ],
  },
  {
    id: 'one-does-not-simply',
    name: 'One Does Not Simply',
    url: '/images/templates/one-does-not-simply.jpg',
    width: 600,
    height: 400,
    defaultTextPositions: [
      { x: 300, y: 100 },
      { x: 300, y: 300 },
    ],
  },
  {
    id: 'ancient-aliens',
    name: 'Ancient Aliens Guy',
    url: '/images/templates/ancient-aliens.jpg',
    width: 500,
    height: 500,
    defaultTextPositions: [{ x: 250, y: 400 }],
  },
  {
    id: 'success-kid',
    name: 'Success Kid',
    url: '/images/templates/success-kid.jpg',
    width: 500,
    height: 500,
    defaultTextPositions: [
      { x: 250, y: 80 },
      { x: 250, y: 420 },
    ],
  },
];
