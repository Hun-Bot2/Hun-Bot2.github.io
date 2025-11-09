import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

interface SignProps {
  position: [number, number, number]
  text: string
  rotation?: [number, number, number]
}

export function Sign3D({ position, text, rotation = [0, 0, 0] }: SignProps) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={rotation}>
        {/* Sign post */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        
        {/* Sign board */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.5, 0.2, 0.02]} />
          <meshStandardMaterial color="#f5deb3" />
        </mesh>
        
        {/* Text on sign */}
        <Text
          position={[0, 0.6, 0.02]}
          fontSize={0.06}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </group>
    </RigidBody>
  )
}

export function WelcomeSign() {
  return (
    <Sign3D 
      position={[0, 0, 5]} 
      text="WELCOME"
      rotation={[0, Math.PI, 0]}
    />
  )
}

export function ProjectSigns() {
  return (
    <>
      <Sign3D position={[8, 0, 8]} text="PROJECTS →" rotation={[0, -Math.PI / 4, 0]} />
      <Sign3D position={[-8, 0, 8]} text="← ABOUT" rotation={[0, Math.PI / 4, 0]} />
      <Sign3D position={[0, 0, -8]} text="CONTACT" rotation={[0, 0, 0]} />
    </>
  )
}
