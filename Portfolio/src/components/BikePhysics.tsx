import { useRef, forwardRef, useImperativeHandle, MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Group, Object3D } from 'three'
import BikeModel from './BikeModel'
import useKeyboardControls from './KeyboardControls'
import { BikePhysicsProps } from '../types'

interface ExtendedBikePhysicsProps extends BikePhysicsProps {
  speed?: number
  rotationSpeed?: number
  wheelRotationSpeed?: number
}

const BikePhysics = forwardRef<any, ExtendedBikePhysicsProps>(({ 
  onCameraAngleChange,
  speed = 8,
  rotationSpeed = 2.5,
  wheelRotationSpeed = 10
}, ref) => {
  const rigidBodyRef = useRef<any>(null)
  const frontWheelRef = useRef<Group | null>(null)
  const backWheelRef = useRef<Group | null>(null)
  const frontSpokesRef = useRef<Object3D | null>(null)
  const backSpokesRef = useRef<Object3D | null>(null)
  const chainRefs = useRef<Object3D[]>([])
  const keys = useKeyboardControls()

  // Expose rigidBodyRef to parent
  useImperativeHandle(ref, () => rigidBodyRef.current)

  const handleWheelsFound = ({ 
    frontWheelRef: front, 
    backWheelRef: back,
    frontSpokesRef: frontSpokes,
    backSpokesRef: backSpokes,
    chainRefs: chains
  }: { 
    frontWheelRef: MutableRefObject<Group | null>
    backWheelRef: MutableRefObject<Group | null>
    frontSpokesRef: MutableRefObject<Object3D | null>
    backSpokesRef: MutableRefObject<Object3D | null>
    chainRefs: MutableRefObject<Object3D[]>
  }) => {
    frontWheelRef.current = front.current
    backWheelRef.current = back.current
    frontSpokesRef.current = frontSpokes.current
    backSpokesRef.current = backSpokes.current
    chainRefs.current = chains.current
  }

  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return

    const rb = rigidBodyRef.current
    const position = rb.translation()
    const rotation = rb.rotation()

    // Get current Y rotation from quaternion
    const currentRotation = Math.atan2(
      2 * (rotation.w * rotation.y + rotation.x * rotation.z),
      1 - 2 * (rotation.y * rotation.y + rotation.z * rotation.z)
    )

    let velocityX = 0
    let velocityZ = 0
    let angularVelocity = 0
    let wheelRotation = 0

    // Rotation
    if (keys.left) {
      angularVelocity = rotationSpeed
    }
    if (keys.right) {
      angularVelocity = -rotationSpeed
    }

    // Movement
    if (keys.forward) {
      velocityX = -Math.sin(currentRotation) * speed
      velocityZ = -Math.cos(currentRotation) * speed
      wheelRotation = -wheelRotationSpeed * delta
    }
    if (keys.backward) {
      velocityX = Math.sin(currentRotation) * speed
      velocityZ = Math.cos(currentRotation) * speed
      wheelRotation = wheelRotationSpeed * delta
    }

    // Apply physics
    rb.setLinvel({ x: velocityX, y: rb.linvel().y, z: velocityZ }, true)
    rb.setAngvel({ x: 0, y: angularVelocity, z: 0 }, true)

    // All wheel/spokes/chain rotation disabled - focus on free movement
    // Will add back later when rotation mechanics are perfected

    // Camera angle control
    const cameraRotationSpeed = 2 * delta
    if (keys.cameraLeft && onCameraAngleChange) {
      onCameraAngleChange((prev) => prev + cameraRotationSpeed)
    }
    if (keys.cameraRight && onCameraAngleChange) {
      onCameraAngleChange((prev) => prev - cameraRotationSpeed)
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="cuboid"
      position={[0, 1, 0]}
      enabledRotations={[false, true, false]}
      linearDamping={0.8}
      angularDamping={0.8}
      mass={10}
      friction={1}
      restitution={0.1}
    >
      <group>
        <BikeModel onWheelsFound={handleWheelsFound} />
      </group>
    </RigidBody>
  )
})

BikePhysics.displayName = 'BikePhysics'

export default BikePhysics
