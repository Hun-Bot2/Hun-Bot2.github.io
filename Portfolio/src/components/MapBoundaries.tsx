import { RigidBody } from '@react-three/rapier'

const MAP_SIZE = 50

export default function MapBoundaries() {
  const wallHeight = 2
  const wallThickness = 0.6

  return (
    <group>
      {/* North Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, -MAP_SIZE]} castShadow receiveShadow>
          <boxGeometry args={[MAP_SIZE * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.25} 
            roughness={0.6}
            emissive="#0ea5e9"
            emissiveIntensity={0.35}
          />
        </mesh>
      </RigidBody>

      {/* South Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, MAP_SIZE]} castShadow receiveShadow>
          <boxGeometry args={[MAP_SIZE * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.25} 
            roughness={0.6}
            emissive="#0ea5e9"
            emissiveIntensity={0.35}
          />
        </mesh>
      </RigidBody>

      {/* West Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-MAP_SIZE, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, MAP_SIZE * 2]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.25} 
            roughness={0.6}
            emissive="#0ea5e9"
            emissiveIntensity={0.35}
          />
        </mesh>
      </RigidBody>

      {/* East Wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[MAP_SIZE, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, MAP_SIZE * 2]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.25} 
            roughness={0.6}
            emissive="#0ea5e9"
            emissiveIntensity={0.35}
          />
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
            <meshStandardMaterial 
              color="#0ea5e9" 
              emissive="#67e8f9" 
              emissiveIntensity={0.65} 
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
        </RigidBody>
      ))}
    </group>
  )
}
