import { useMemo, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { ProjectMonitorProps } from '../types'
import { groundPosition } from '../utils/placement'
import { MacBook } from './SceneModels'

function useProjectTexture(image?: string) {
  if (!image) return null
  const texture = useLoader(THREE.TextureLoader, image, (loader) => {
    loader.crossOrigin = ''
  })
  return useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    return texture
  }, [texture])
}

export default function ProjectMonitor({ project, bikePosition, onInteract }: ProjectMonitorProps) {
  const monitorRef = useRef<THREE.Group>(null)
  const rigidBodyRef = useRef<any>(null)
  const [isNearby, setIsNearby] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const texture = useProjectTexture(project.image)
  
  const interactionDistance = 3 // 3 units to show interaction hint
  
  useFrame(() => {
    if (!rigidBodyRef.current) return
    
    // Get current position from rigid body
    const currentPos = rigidBodyRef.current.translation()
    const monitorPos = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z)
    const distance = bikePosition.distanceTo(monitorPos)
    
    // Update nearby state
    setIsNearby(distance < interactionDistance)
    
    // Make monitor face the bike slightly when nearby
    if (monitorRef.current && distance < interactionDistance * 2) {
      monitorRef.current.lookAt(bikePosition)
    }
  })
  
  // Handle interaction
  const handleClick = () => {
    if (!isNearby) return
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noreferrer')
      return
    }
    onInteract(project)
  }
  
  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed"
      position={groundPosition(project.position)}
      colliders="cuboid"
      friction={1}
    >
      <group ref={monitorRef} position={[0, 0, 0]} onClick={handleClick}>
        {/* Enlarged monitor using MacBook model */}
        <MacBook scale={1.4} position={[0, 0, 0]} />

        {/* Screen with optional project image */}
        <mesh position={[0, 10, 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.75]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color={isHovered ? '#6dd3ff' : '#4d5c6d'} />
          )}
        </mesh>
      
        {/* Project title above monitor */}
        <Text
          position={[0, 1.7, 0]}
          fontSize={0.2}
          color={isNearby ? '#61dafb' : '#ffffff'}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          letterSpacing={0.02}
          depthOffset={-1}
        >
          {project.title}
        </Text>
        
        {/* Tech stack below title */}
        <Text
          position={[0, 1.45, 0]}
          fontSize={0.11}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          letterSpacing={0.01}
          depthOffset={-1}
        >
          {project.tech.join(' • ')}
        </Text>
      </group>
    </RigidBody>
  )
}
