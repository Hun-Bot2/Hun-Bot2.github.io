

export function Roads() {
  const roadMaterial = {
    color: '#1f1f24',
    roughness: 0.75,
    metalness: 0.2
  }

  const lineColor = '#ffbf69'
  const glowColor = '#61daf8'

  return (
    <group>
      {/* Main cross roads */}
      {/* Horizontal road */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 2.8]} />
        <meshStandardMaterial {...roadMaterial} emissive={glowColor} emissiveIntensity={0.08} />
      </mesh>
      
      {/* Vertical road */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
        <planeGeometry args={[80, 2.8]} />
        <meshStandardMaterial {...roadMaterial} emissive={glowColor} emissiveIntensity={0.08} />
      </mesh>

      {/* Road markings - horizontal */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = -40 + i * 4
        return (
          <mesh key={`h-${i}`} position={[x, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 0.16]} />
            <meshStandardMaterial color={lineColor} emissive={lineColor} emissiveIntensity={0.5} />
          </mesh>
        )
      })}

      {/* Road markings - vertical */}
      {Array.from({ length: 20 }).map((_, i) => {
        const z = -40 + i * 4
        return (
          <mesh key={`v-${i}`} position={[0, 0.021, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[1.6, 0.16]} />
            <meshStandardMaterial color={lineColor} emissive={lineColor} emissiveIntensity={0.5} />
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
        <meshStandardMaterial color="#1f1f24" roughness={0.75} metalness={0.2} emissive="#61daf8" emissiveIntensity={0.12} />
      </mesh>

    </>
  )
}

export default Roads
