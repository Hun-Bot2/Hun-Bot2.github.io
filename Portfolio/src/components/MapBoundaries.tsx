import { RigidBody } from '@react-three/rapier'

const MAP_SIZE = 50

export default function MapBoundaries() {
  const wallHeight = 5
  const wallThickness = 1

  return (
    <group>
      {/* North Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, -MAP_SIZE]} castShadow receiveShadow>
          <boxGeometry args={[MAP_SIZE * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* South Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, MAP_SIZE]} castShadow receiveShadow>
          <boxGeometry args={[MAP_SIZE * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* West Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-MAP_SIZE, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, MAP_SIZE * 2]} />
          <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* East Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[MAP_SIZE, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, MAP_SIZE * 2]} />
          <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Corner Decorations */}
      {[
        [-MAP_SIZE + 2, 0, -MAP_SIZE + 2],
        [MAP_SIZE - 2, 0, -MAP_SIZE + 2],
        [-MAP_SIZE + 2, 0, MAP_SIZE - 2],
        [MAP_SIZE - 2, 0, MAP_SIZE - 2],
      ].map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[1, 1, 3, 8]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
          </mesh>
        </RigidBody>
      ))}
    </group>
  )
}
