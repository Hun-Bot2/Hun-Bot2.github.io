import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { Euler, Group, MathUtils, Quaternion, Vector3 } from 'three'
import BikeModel from './BikeModel'
import useKeyboardControls from './KeyboardControls'
import { BikePhysicsProps } from '../types'

interface ExtendedBikePhysicsProps extends BikePhysicsProps {
  speed?: number
  rotationSpeed?: number
}

// Dynamic bike controller with collision; smoothed velocity for consistent feel
const BikePhysics = forwardRef<any, ExtendedBikePhysicsProps>(({
  onCameraAngleChange,
  speed = 14,         // top forward speed
  rotationSpeed = 3.0  // base turn rate
}, ref) => {
  const rigidBodyRef = useRef<any>(null)
  const bikeVisualRef = useRef<Group | null>(null)
  const keys = useKeyboardControls()

  useImperativeHandle(ref, () => rigidBodyRef.current)

  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return
    const rb = rigidBodyRef.current
    const rot = rb.rotation()
    const linvel = rb.linvel()

    const currentRotY = Math.atan2(
      2 * (rot.w * rot.y + rot.x * rot.z),
      1 - 2 * (rot.y * rot.y + rot.z * rot.z)
    )

    const turnInput = (keys.left ? 1 : 0) - (keys.right ? 1 : 0)
    const throttle = keys.forward ? 1 : keys.backward ? -0.8 : 0

    // Forward direction
    const forwardDir = new Vector3(
      -Math.sin(currentRotY),
      0,
      -Math.cos(currentRotY)
    ).normalize()

    // Target velocity
    const targetSpeed = MathUtils.clamp(throttle * speed, -speed * 0.6, speed)
    const targetHorizontal = forwardDir.clone().multiplyScalar(targetSpeed)
    const currentHorizontal = new Vector3(linvel.x, 0, linvel.z)

    // Smooth toward target
    const lerpFactor = MathUtils.clamp(delta * (throttle !== 0 ? 8 : 4), 0, 1)
    const blended = currentHorizontal.lerp(targetHorizontal, lerpFactor)

    // Drag when no input
    if (throttle === 0) {
      blended.multiplyScalar(Math.max(0, 1 - 3 * delta))
    }

    const newVel = { x: blended.x, y: linvel.y * 0.98, z: blended.z }
    rb.setLinvel(newVel, true)

    const horizSpeed = Math.hypot(blended.x, blended.z)

    // Steering scaled by speed
    const speedRatio = MathUtils.clamp(horizSpeed / speed, 0, 1)
    const turnRate = rotationSpeed * MathUtils.lerp(0.35, 1, speedRatio)
    const desiredHeading = currentRotY + turnInput * turnRate * delta
    const quat = new Quaternion().setFromEuler(new Euler(0, desiredHeading, 0))
    rb.setRotation(quat, true)
    rb.setAngvel({ x: 0, y: turnInput * turnRate, z: 0 }, true)

    // Lean visual
    if (bikeVisualRef.current) {
      const leanStrength = Math.min(1, horizSpeed / speed)
      const targetLean = MathUtils.clamp(-turnInput * 0.32 * leanStrength, -0.32, 0.32)
      bikeVisualRef.current.rotation.z = MathUtils.lerp(
        bikeVisualRef.current.rotation.z,
        targetLean,
        MathUtils.clamp(delta * 10, 0, 1)
      )
    }

    // Camera angle control
    const cameraRotationSpeed = 1.5 * delta
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
      position={[0, 4, 0]}
      enabledRotations={[false, true, false]}
      linearDamping={0.5}
      angularDamping={1.1}
      friction={1.6}
      restitution={0.01}
      mass={12}
      canSleep={false}
      ccd
    >
      <CapsuleCollider args={[0.8, 1.2]} position={[0, 1.6, 0]} />
      <group ref={bikeVisualRef}>
        <BikeModel scale={0.5} position={[0, 0, 0]} />
      </group>
    </RigidBody>
  )
})

BikePhysics.displayName = 'BikePhysics'

export default BikePhysics
