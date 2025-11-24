import { useState, useEffect } from 'react'
import { KeyboardControls as KeyboardControlsType } from '../types'

// Arrow keys only for movement, Q/E for camera, F/ㄹ for interact
export default function useKeyboardControls(): KeyboardControlsType {
  const [keys, setKeys] = useState<KeyboardControlsType>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    cameraLeft: false,
    cameraRight: false,
    interact: false
  })

  useEffect(() => {
    const setKey = (key: string, pressed: boolean) => {
      switch (key) {
        case 'arrowup':
          setKeys((k) => ({ ...k, forward: pressed }))
          break
        case 'arrowdown':
          setKeys((k) => ({ ...k, backward: pressed }))
          break
        case 'arrowleft':
          setKeys((k) => ({ ...k, left: pressed }))
          break
        case 'arrowright':
          setKeys((k) => ({ ...k, right: pressed }))
          break
        case 'f':
        case 'ㄹ':
          setKeys((k) => ({ ...k, interact: pressed }))
          break
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      setKey(e.key.toLowerCase(), true)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKey(e.key.toLowerCase(), false)
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
