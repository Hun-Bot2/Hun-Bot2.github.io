import { RigidBody } from '@react-three/rapier'

export function Roads() {
  const roadMaterial = {
    color: '#2c2c2c',
    roughness: 0.9,
    metalness: 0.1
  }

  const lineColor = '#ffeb3b'

  return (
    <group>
      {/* Main cross roads */}
      {/* Horizontal road */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 2]} />
        <meshStandardMaterial {...roadMaterial} />
      </mesh>
      
      {/* Vertical road */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
        <planeGeometry args={[80, 2]} />
        <meshStandardMaterial {...roadMaterial} />
      </mesh>

      {/* Road markings - horizontal */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = -40 + i * 4
        return (
          <mesh key={`h-${i}`} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 0.1]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        )
      })}

      {/* Road markings - vertical */}
      {Array.from({ length: 20 }).map((_, i) => {
        const z = -40 + i * 4
        return (
          <mesh key={`v-${i}`} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[1.5, 0.1]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        )
      })}

      {/* Circular path around center */}
      <RoundaboutPath />
    </group>
  )
}

function RoundaboutPath() {
  const segments = 64
  const radius = 8
  const points: number[] = []

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(
      Math.cos(angle) * radius,
      0.02,
      Math.sin(angle) * radius
    )
  }

  return (
    <>
      {/* Roundabout circle */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[7, 9, 64]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.9} />
      </mesh>

      {/* Center island - no physics, just visual */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[6.5, 6.5, 0.1, 32]} />
        <meshStandardMaterial color="#90EE90" roughness={0.8} />
      </mesh>

      {/* Decorative center piece */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.3} />
      </mesh>
    </>
  )
}

export default Roads
