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
  offset = 10, 
  height = 12, 
  sideOffset = 0,
  smoothness = 0.1 
}: CameraControllerProps) {
  useFrame((state) => {
    if (!targetRef.current) return

    const position = targetRef.current.translation()
    const velocity = targetRef.current.linvel()
    
    // Calculate camera offset based on bike velocity (anticipate movement)
    const velocityFactor = 0.5
    const anticipateX = velocity.x * velocityFactor
    const anticipateZ = velocity.z * velocityFactor
    
    // Top-down view - camera directly above the bike with slight anticipation
    const targetX = position.x + anticipateX
    const targetZ = position.z + anticipateZ
    
    // Smooth camera follow with easing
    const lerpFactor = 1 - Math.pow(1 - smoothness, state.clock.getDelta() * 60)
    
    state.camera.position.x += (targetX - state.camera.position.x) * lerpFactor
    state.camera.position.y += (position.y + height - state.camera.position.y) * lerpFactor
    state.camera.position.z += (targetZ - state.camera.position.z) * lerpFactor
    
    // Look at bike position (not camera position)
    const lookAtTarget = new THREE.Vector3(position.x, position.y, position.z)
    const currentLookAt = new THREE.Vector3()
    state.camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(state.camera.position)
    
    currentLookAt.lerp(lookAtTarget, lerpFactor)
    state.camera.lookAt(currentLookAt)
  })

  return null
}
