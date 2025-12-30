import { useMemo, useRef } from 'react'
import { Text } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { groundPosition } from '../utils/placement'

type Props = {
  label: string
  url: string
  position: [number, number, number]
  icon?: string
}

export default function SocialPedestal({ label, url, position, icon }: Props) {
  const ref = useRef<any>(null)
  const texture = useIconTexture(icon)

  const handleOpen = () => {
    window.open(url, '_blank', 'noreferrer')
  }

  const pedestalColor = '#0f172a'
  const accentColor = '#59c6ff'

  return (
    <RigidBody type="fixed" colliders="trimesh" position={groundPosition(position)} ref={ref}>
      {/* Ground interaction marker */}
      <group position={[0, 0.01, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={handleOpen}>
          <planeGeometry args={[1.4, 0.9]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={handleOpen}>
          <planeGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.16} />
        </mesh>
        <Text
          position={[0, 0.02, 0.01]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.16}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {label}
        </Text>
      </group>

      {/* Simple pedestal + icon board */}
      <group position={[0, 0.4, 0]} onClick={handleOpen}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.4, 12]} />
          <meshStandardMaterial color={pedestalColor} roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.6, 0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.25, 0.028]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.8, 0.5]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} transparent />
          ) : (
            <meshBasicMaterial color={accentColor} />
          )}
        </mesh>
      </group>
    </RigidBody>
  )
}

function useIconTexture(icon?: string) {
  if (!icon) return null
  const texture = useLoader(THREE.TextureLoader, icon)
  return useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    return texture
  }, [texture])
}
