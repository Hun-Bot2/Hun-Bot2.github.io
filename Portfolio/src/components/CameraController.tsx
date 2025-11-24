import { RefObject, MutableRefObject, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraControllerProps {
  targetRef: RefObject<any> | MutableRefObject<any>
  cameraAngle: number
  offset?: number
  height?: number
  sideOffset?: number
  smoothness?: number
}

export default function CameraController({ 
  targetRef, 
  offset = 8, 
  height = 5, 
  smoothness = 1.5
}: CameraControllerProps) {
  // Smoothed camera state (position & target) similar to R3F rapier sample
  const smoothedPos = useRef(new THREE.Vector3(10, 10, 10))
  const smoothedTarget = useRef(new THREE.Vector3())

  useFrame((state) => {
    if (!targetRef.current) return

    const position = targetRef.current.translation()
    const linvel = targetRef.current.linvel ? targetRef.current.linvel() : { x: 0, z: 0 }
    const rotation = targetRef.current.rotation()
    
    // Get bike's rotation angle
    const bikeRotation = Math.atan2(
      2 * (rotation.w * rotation.y + rotation.x * rotation.z),
      1 - 2 * (rotation.y * rotation.y + rotation.z * rotation.z)
    )
    
    // Third-person camera behind the bike
    const cameraDistance = offset
    const cameraHeight = height
    
    // Calculate camera position behind the bike
    const cameraX = position.x + Math.sin(bikeRotation) * cameraDistance
    const cameraY = position.y + cameraHeight
    const cameraZ = position.z + Math.cos(bikeRotation) * cameraDistance
    
    // Smooth camera follow with easing
    const speed = Math.hypot(linvel.x || 0, linvel.z || 0)
    // Clamp delta to avoid spikes; keep smoothing tighter to reduce jitter
    const dt = Math.min(state.clock.getDelta(), 1 / 30)
    const adaptiveSmooth = Math.min(0.28, Math.max(smoothness, 0.12 + speed * 0.01))
    const lerpFactor = 1 - Math.pow(1 - adaptiveSmooth, dt * 60)

    const desiredPos = new THREE.Vector3(cameraX, cameraY, cameraZ)
    smoothedPos.current.lerp(desiredPos, lerpFactor)
    state.camera.position.copy(smoothedPos.current)

    // Look at bike position, smoothed
    const desiredTarget = new THREE.Vector3(position.x, position.y + 1, position.z)
    smoothedTarget.current.lerp(desiredTarget, lerpFactor)
    state.camera.lookAt(smoothedTarget.current)
  })

  return null
}
