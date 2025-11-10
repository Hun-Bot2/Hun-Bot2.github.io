import { RefObject, MutableRefObject } from 'react'
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
  cameraAngle, 
  offset = 8, 
  height = 5, 
  sideOffset = 0,
  smoothness = 0.1 
}: CameraControllerProps) {
  useFrame((state) => {
    if (!targetRef.current) return

    const position = targetRef.current.translation()
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
    const cameraZ = position.z + Math.cos(bikeRotation) * cameraDistance
    const cameraY = position.y + cameraHeight
    
    // Smooth camera follow with easing
    const lerpFactor = 1 - Math.pow(1 - smoothness, state.clock.getDelta() * 60)
    
    state.camera.position.x += (cameraX - state.camera.position.x) * lerpFactor
    state.camera.position.y += (cameraY - state.camera.position.y) * lerpFactor
    state.camera.position.z += (cameraZ - state.camera.position.z) * lerpFactor
    
    // Look at bike position
    const lookAtTarget = new THREE.Vector3(position.x, position.y + 1, position.z)
    const currentLookAt = new THREE.Vector3()
    state.camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(state.camera.position)
    
    currentLookAt.lerp(lookAtTarget, lerpFactor)
    state.camera.lookAt(currentLookAt)
  })

  return null
}
