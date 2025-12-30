import { useRef, useEffect, MutableRefObject } from 'react'
import { useGLTF } from '@react-three/drei'
import { Group, Object3D } from 'three'

interface BikeModelProps {
  scale?: number
  position?: [number, number, number]
  onWheelsFound?: (wheels: { 
    frontWheelRef: MutableRefObject<Group | null>
    backWheelRef: MutableRefObject<Group | null>
    frontSpokesRef: MutableRefObject<Object3D | null>
    backSpokesRef: MutableRefObject<Object3D | null>
    chainRefs: MutableRefObject<Object3D[]>
  }) => void
}

export default function BikeModel({ scale = 0.5, position = [0, 5, 0], onWheelsFound }: BikeModelProps) {
  const { scene } = useGLTF('/models/bike.gltf')
  const frontWheelRef = useRef<Group | null>(null)
  const backWheelRef = useRef<Group | null>(null)
  const frontSpokesRef = useRef<Object3D | null>(null)
  const backSpokesRef = useRef<Object3D | null>(null)
  const chainRefs = useRef<Object3D[]>([])

  // Find wheels in the model
  useEffect(() => {
    if (scene) {
      console.log('🔍 Searching for bike wheels, spokes, and chain...')
      
      let frontWheel: Object3D | null = null
      let backWheel: Object3D | null = null
      let frontSpokes: Object3D | null = null
      let backSpokes: Object3D | null = null
      const chains: Object3D[] = []
      
      scene.traverse((child) => {
        // Find wheel spokes (바퀴살)
        if (child.name === 'F_Raios') {
          frontSpokes = child
          console.log('  🎡 Found FRONT spokes (F_Raios)')
        } else if (child.name === 'B_Raios') {
          backSpokes = child
          console.log('  🎡 Found BACK spokes (B_Raios)')
        }
        
        // Find chain (체인) - NurbsCurve is the actual chain, not pedal crank
        else if (child.name === 'NurbsCurve') {
          chains.push(child)
          console.log('  ⛓️ Found CHAIN (NurbsCurve)')
        }
        
        // Find wheel groups - need the PARENT group that contains all Torus meshes
        else if (child.type === 'Group') {
          const pos = child.position
          const rot = child.rotation
          
          // Check if it's a wheel group (rotated 90 degrees and at wheel height)
          if (Math.abs(rot.x - Math.PI / 2) < 0.01 && Math.abs(pos.y + 1.18) < 0.01) {
            // Front wheel: x = 1.9
            if (pos.x > 1 && !frontWheel) {
              frontWheel = child
              console.log('  🎡 Found FRONT wheel group at:', pos.x, '- contains', child.children.length, 'meshes')
            }
            // Back wheel: x = -1.05
            else if (pos.x < 0 && !backWheel) {
              backWheel = child
              console.log('  🎡 Found BACK wheel group at:', pos.x, '- contains', child.children.length, 'meshes')
            }
          }
        }
      })

      frontWheelRef.current = frontWheel as Group | null
      backWheelRef.current = backWheel as Group | null
      frontSpokesRef.current = frontSpokes
      backSpokesRef.current = backSpokes
      chainRefs.current = chains

      // Pass refs to parent
      if (onWheelsFound) {
        onWheelsFound({ 
          frontWheelRef, 
          backWheelRef, 
          frontSpokesRef, 
          backSpokesRef,
          chainRefs
        })
      }
    }
  }, [scene, onWheelsFound])

  return (
    <primitive 
      object={scene} 
      scale={scale}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
    />
  )
}

// Preload the model
useGLTF.preload('/models/bike.gltf')
