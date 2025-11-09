import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import BikePhysics from '../components/BikePhysics'
import CameraController from '../components/CameraController'
import ProjectMonitor from '../components/ProjectMonitor'
import ProjectModal from '../components/ProjectModal'
import MapBoundaries from '../components/MapBoundaries'
import MapObstacles from '../components/MapObstacles'
import Roads from '../components/Roads'
import { WelcomeSign, ProjectSigns } from '../components/InteractiveSigns'
import { House, LargeRock, Rock, Keyboard, ShipWreck, TreeSpruce, TreeLime, MacBook } from '../components/SceneModels'
import { projects } from '../data/projects'
import { Project } from '../types'

const INTERACTION_DISTANCE = 3
const POSITION_UPDATE_INTERVAL = 100

export default function BikeScene() {
  const bikeRef = useRef<any>(null)
  const [bikePosition, setBikePosition] = useState(new THREE.Vector3(0, 0, 0))
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [nearbyProject, setNearbyProject] = useState<Project | null>(null)
  const [cameraAngle, setCameraAngle] = useState(0)
  const [useOrbitControls, setUseOrbitControls] = useState(false)
  
  // Update bike position for distance calculations
  useEffect(() => {
    const interval = setInterval(() => {
      if (bikeRef.current) {
        const pos = bikeRef.current.translation()
        setBikePosition(new THREE.Vector3(pos.x, pos.y, pos.z))
        
        // Find nearest project
        let closest: Project | null = null
        let minDist = INTERACTION_DISTANCE
        
        projects.forEach(project => {
          const projectPos = new THREE.Vector3(...project.position)
          const dist = new THREE.Vector3(pos.x, pos.y, pos.z).distanceTo(projectPos)
          if (dist < minDist) {
            minDist = dist
            closest = project
          }
        })
        
        setNearbyProject(closest)
      }
    }, POSITION_UPDATE_INTERVAL)
    
    return () => clearInterval(interval)
  }, [])
  
  // Handle E key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        if (nearbyProject && !selectedProject) {
          setSelectedProject(nearbyProject)
        }
      }
      // Toggle camera controls with C key
      if (e.key === 'c' || e.key === 'C') {
        setUseOrbitControls(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nearbyProject, selectedProject])

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(180deg, #87CEEB 0%, #B0D9F1 50%, #E8D5C4 100%)' }}>
      <Canvas 
        camera={{ position: [0, 15, 0], fov: 75 }}
        shadows
      >
        {/* Sunlight - Realistic sun lighting */}
        <ambientLight intensity={0.4} color="#fef5e7" />
        
        {/* Main Sun - Directional light from top-right */}
        <directionalLight 
          position={[50, 50, 30]} 
          intensity={2.5} 
          castShadow 
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-bias={-0.0001}
          color="#fff4e6"
        />
        
        {/* Sun glow effect - soft fill light */}
        <directionalLight 
          position={[-30, 40, -20]} 
          intensity={0.8} 
          color="#ffd89b"
        />
        
        {/* Ground bounce light - simulates light reflecting from sand */}
        <hemisphereLight 
          args={["#87CEEB", "#d4a574", 0.6]}
        />
        
        <Physics gravity={[0, -9.81, 0]}>
          <Suspense fallback={null}>
            {/* Bike with Physics */}
            <BikePhysics 
              ref={bikeRef}
              onCameraAngleChange={setCameraAngle}
            />
            
            {/* Project Monitors */}
            {projects.map((project) => (
              <ProjectMonitor
                key={project.id}
                project={project}
                bikePosition={bikePosition}
                onInteract={setSelectedProject}
              />
            ))}

            {/* Map Boundaries */}
            <MapBoundaries />

            {/* Roads - Bruno Simon style */}
            <Roads />

            {/* Welcome Signs */}
            <WelcomeSign />
            <ProjectSigns />

            {/* Map Obstacles */}
            <MapObstacles />

            {/* Scene Decorations - Trees */}
            <TreeSpruce position={[-30, 0, -30]} scale={0.4} />
            <TreeSpruce position={[-35, 0, -25]} scale={0.35} />
            <TreeLime position={[30, 0, -30]} scale={0.45} />
            <TreeLime position={[35, 0, -35]} scale={0.38} />
            <TreeSpruce position={[-40, 0, 30]} scale={0.42} />
            <TreeLime position={[40, 0, 30]} scale={0.4} />
            <TreeSpruce position={[0, 0, -40]} scale={0.46} />
            <TreeLime position={[0, 0, 40]} scale={0.42} />

            {/* Scene Decorations - Rocks */}
            <LargeRock position={[-25, 0, 15]} scale={0.3} />
            <Rock position={[-28, 0, 18]} scale={0.25} />
            <Rock position={[25, 0, -15]} scale={0.26} />
            <LargeRock position={[28, 0, -12]} scale={0.28} />
            <Rock position={[-15, 0, -25]} scale={0.22} />
            <LargeRock position={[15, 0, 25]} scale={0.32} />

            {/* Ship Wreck - centerpiece */}
            <ShipWreck position={[-15, 0, -35]} scale={0.6} />

            {/* House */}
            <House position={[35, 0, -15]} scale={0.3} />

            {/* Interactive Objects */}
            <Keyboard position={[-10, 0.1, 10]} scale={0.1} type="dynamic" />
            <MacBook position={[10, 0.1, 10]} scale={0.1} type="dynamic" />
          </Suspense>
          
          {/* Ground - with collision */}
          <RigidBody type="fixed" colliders="cuboid">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial 
                color="#c2b280"
                metalness={0}
                roughness={0.95}
              />
            </mesh>
          </RigidBody>
        </Physics>

        {/* Camera Controller - follows bike */}
        {!useOrbitControls && (
          <CameraController 
            targetRef={bikeRef}
            cameraAngle={cameraAngle}
            offset={0}
            height={12}
            sideOffset={0}
            smoothness={0.15}
          />
        )}

        {/* OrbitControls - for testing (toggle with C key) */}
        {useOrbitControls && <OrbitControls />}

        {/* Environment - Sunny day atmosphere */}
        <Environment preset="sunset" />
        <fog attach="fog" args={['#B0D9F1', 30, 80]} />
      </Canvas>
      
      {/* HUD - Controls Info */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <div>🚴 Portfolio Explorer</div>
        <div style={{ marginTop: '10px' }}>Controls:</div>
        <div>• W/↑ - Forward</div>
        <div>• S/↓ - Backward</div>
        <div>• A/← - Turn Left</div>
        <div>• D/→ - Turn Right</div>
        <div>• Q/E - Rotate Camera</div>
        <div>• C - Toggle Free Camera</div>
        <div style={{ marginTop: '5px', fontSize: '12px', color: '#94a3b8' }}>
          Camera: {useOrbitControls ? 'Free (Orbit)' : 'Follow Bike'}
        </div>
        {nearbyProject && (
          <div style={{ marginTop: '10px', color: '#60a5fa', fontWeight: 'bold' }}>
            📍 Near: {nearbyProject.title}
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Press E to view</div>
          </div>
        )}
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  )
}
