import { useState, useEffect } from 'react'
import { KeyboardControls as KeyboardControlsType } from '../types'

export default function useKeyboardControls(): KeyboardControlsType {
  const [keys, setKeys] = useState<KeyboardControlsType>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    cameraLeft: false,
    cameraRight: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
        case 'arrowup':
          setKeys((k: KeyboardControlsType) => ({ ...k, forward: true }))
          break
        case 's':
        case 'arrowdown':
          setKeys((k: KeyboardControlsType) => ({ ...k, backward: true }))
          break
        case 'a':
        case 'arrowleft':
          setKeys((k: KeyboardControlsType) => ({ ...k, left: true }))
          break
        case 'd':
        case 'arrowright':
          setKeys((k: KeyboardControlsType) => ({ ...k, right: true }))
          break
        case 'q':
          setKeys((k: KeyboardControlsType) => ({ ...k, cameraLeft: true }))
          break
        case 'e':
          setKeys((k: KeyboardControlsType) => ({ ...k, cameraRight: true }))
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
        case 'arrowup':
          setKeys((k: KeyboardControlsType) => ({ ...k, forward: false }))
          break
        case 's':
        case 'arrowdown':
          setKeys((k: KeyboardControlsType) => ({ ...k, backward: false }))
          break
        case 'a':
        case 'arrowleft':
          setKeys((k: KeyboardControlsType) => ({ ...k, left: false }))
          break
        case 'd':
        case 'arrowright':
          setKeys((k: KeyboardControlsType) => ({ ...k, right: false }))
          break
        case 'q':
          setKeys((k: KeyboardControlsType) => ({ ...k, cameraLeft: false }))
          break
        case 'e':
          setKeys((k: KeyboardControlsType) => ({ ...k, cameraRight: false }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keys
}
