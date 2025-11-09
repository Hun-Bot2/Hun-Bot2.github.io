import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { ProjectMonitorProps } from '../types'
import BookcaseModel from './project-model'

export default function ProjectMonitor({ project, bikePosition, onInteract }: ProjectMonitorProps) {
  const monitorRef = useRef<THREE.Group>(null)
  const rigidBodyRef = useRef<any>(null)
  const [isNearby, setIsNearby] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
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
    if (isNearby) {
      onInteract(project)
    }
  }
  
  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={project.position}
      colliders="cuboid"
      mass={5}
      linearDamping={0.8}
      angularDamping={0.8}
      friction={1}
    >
      <group 
        ref={monitorRef}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        {/* Bookcase Model */}
        <BookcaseModel scale={0.5} />
      
      {/* Project title above bookcase */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.08}
        color={isNearby ? '#60a5fa' : '#e2e8f0'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {project.title}
      </Text>
      
      {/* Tech stack below title */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.04}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
        outlineWidth={0.003}
        outlineColor="#000000"
      >
        {project.tech.join(' • ')}
      </Text>
      
      {/* Interaction hint - shows when nearby */}
      {isNearby && (
        <group position={[0, 1, 0]}>
          {/* Background */}
          <mesh>
            <planeGeometry args={[0.5, 0.1]} />
            <meshBasicMaterial 
              color="#000000" 
              transparent 
              opacity={0.8}
            />
          </mesh>
          
          {/* Text */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.04}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Press E or Click
          </Text>
        </group>
      )}
      
      {/* Glowing base when nearby */}
      {isNearby && (
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.6, 32]} />
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
      </group>
    </RigidBody>
  )
}
