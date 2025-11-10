import { RigidBody } from '@react-three/rapier'

export default function MapObstacles() {
  return (
    <group>
      {/* Ramps - Jump platforms */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh position={[15, 0, 0]} rotation={[0, 0, Math.PI / 12]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.5, 6]} />
          <meshStandardMaterial color="#e53e3e" metalness={0.4} roughness={0.6} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <mesh position={[-15, 0, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.5, 6]} />
          <meshStandardMaterial color="#38b2ac" metalness={0.4} roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Platforms */}
      {[
        { pos: [20, 0.5, 20], size: [4, 1, 4], color: '#805ad5' },
        { pos: [-20, 0.5, 20], size: [4, 1, 4], color: '#d69e2e' },
        { pos: [20, 0.5, -20], size: [4, 1, 4], color: '#38a169' },
        { pos: [-20, 0.5, -20], size: [4, 1, 4], color: '#dd6b20' },
      ].map((platform, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh position={platform.pos as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={platform.size as [number, number, number]} />
            <meshStandardMaterial 
              color={platform.color} 
              metalness={0.3} 
              roughness={0.7}
              emissive={platform.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </RigidBody>
      ))}

      {/* Pillars */}
      {[
        [0, 2, 20],
        [0, 2, -20],
      ].map((pos, i) => (
        <RigidBody key={`pillar-${i}`} type="fixed" colliders="cuboid">
          <mesh position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 4, 16]} />
            <meshStandardMaterial 
              color="#667eea" 
              metalness={0.5} 
              roughness={0.5}
              emissive="#667eea"
              emissiveIntensity={0.3}
            />
          </mesh>
        </RigidBody>
      ))}

      {/* Decorative Spheres */}
      {[
        [-25, 1, 0],
        [25, 1, 0],
        [0, 1, 25],
        [0, 1, -25],
      ].map((pos, i) => (
        <mesh key={`sphere-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#f6ad55" 
            emissive="#f6ad55" 
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}
