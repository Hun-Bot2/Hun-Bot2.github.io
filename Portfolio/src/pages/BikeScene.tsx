import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Sky, Text } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import BikePhysics from '../components/BikePhysics'
import CameraController from '../components/CameraController'
import ProjectMonitor from '../components/ProjectMonitor'
import ProjectModal from '../components/ProjectModal'
import MapBoundaries from '../components/MapBoundaries'
import MapObstacles from '../components/MapObstacles'
// import Roads from '../components/Roads'
// import { WelcomeSign, ProjectSigns } from '../components/InteractiveSigns'
import { House, LargeRock, Rock, Keyboard, ShipWreck, TreeSpruce, TreeLime, MacBook } from '../components/SceneModels'
import SocialPedestal from '../components/SocialPedestal'
import { socials } from '../data/socials'
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
  const [started, setStarted] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [startClicked, setStartClicked] = useState(false)
  const [loading, setLoading] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) return
    const total = 100
    const interval = setInterval(() => {
      setLoading((prev) => {
        const next = prev + Math.random() * 15
        if (next >= total) {
          clearInterval(interval)
          setLoading(100)
          setIsLoading(false)
        }
        return Math.min(100, next)
      })
    }, 180)
    return () => clearInterval(interval)
  }, [isLoading])

  useEffect(() => {
    if (startClicked) {
      const timer = setTimeout(() => {
        setStarted(true)
        setOverlayVisible(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [startClicked])

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

  // Handle interact key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      if (key === 'f' || key === 'F' || key === 'ㄹ') {
        if (nearbyProject) {
          if (nearbyProject.githubUrl) {
            window.open(nearbyProject.githubUrl, '_blank', 'noreferrer')
          } else {
            setSelectedProject(nearbyProject)
          }
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
    <div className="bike-scene-container">
      <Link to="/" className="exit-3d-btn">
        ← Back to overview
      </Link>
      <div className="construction-banner">Now under construction…</div>
      {overlayVisible && (
        <div className={`start-overlay ${startClicked ? 'fade-out' : ''}`}>
          {isLoading ? (
            <div className="start-card">
              <span>Loading {Math.floor(loading)}%</span>
            </div>
          ) : (
            <div className="start-hero" onClick={() => setStartClicked(true)}>
              <div className="start-card">
                <span>CLICK TO START</span>
              </div>
            </div>
          )}
        </div>
      )}
      <Canvas 
        camera={{ position: [0, 7, 12], fov: 60 }}
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        {/* Atmosphere + lighting */}
        <Sky
          distance={450000}
          sunPosition={[45, 80, 45]}
          turbidity={12}
          rayleigh={1.6}
          mieCoefficient={0.0012}
          mieDirectionalG={0.85}
        />

        <ambientLight intensity={0.35} color="#f7e8d6" />

        {/* Warm key light */}
        <directionalLight 
          position={[25, 35, 18]} 
          intensity={1.6} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={120}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-bias={-0.00015}
          color="#ffd7a1"
        />

        {/* Cool rim */}
        <directionalLight position={[-20, 24, -18]} intensity={0.65} color="#7fc8ff" />

        <hemisphereLight args={['#cfe8ff', '#f4d8b0', 0.55]} />

        <ContactShadows 
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={140}
          blur={1.6}
          far={60}
        />

        <Physics gravity={[0, -9.81, 0]}>
          <Suspense fallback={null}>
            {/* Bike with Physics */}
            {started && (
              <BikePhysics 
                ref={bikeRef}
                onCameraAngleChange={setCameraAngle}
              />
            )}
            
            {/* Project Monitors */}
            {started && projects.map((project) => (
              <ProjectMonitor
                key={project.id}
                project={project}
                bikePosition={bikePosition}
                onInteract={setSelectedProject}
              />
            ))}

            {/* Map Boundaries */}
            {/* <MapBoundaries /> */}

            {/* Roads removed for clean ground */}

            {/* Welcome Signs removed */}

            {/* Map Obstacles removed */}

            {/* Scene Decorations - Trees clustered near start */}
            <TreeLime position={[-10, 0, -8]} scale={0.5} />
            <TreeLime position={[0, 0, -10]} scale={0.48} />
            <TreeSpruce position={[6, 0, -4]} scale={0.5} />
            <TreeSpruce position={[4, 0, 6]} scale={0.45} />
            <TreeLime position={[-4, 0, 6]} scale={0.45} />

            {/* Scene Decorations - Rocks near start */}
            <Rock position={[-3, 0, -2]} scale={0.28} />
            <LargeRock position={[3, 0, -1]} scale={0.32} />
            <Rock position={[2, 0, 3]} scale={0.26} />
            <LargeRock position={[-2, 0, 2]} scale={0.3} />

            {/* Interactive Objects */}
            {started && (
              <>
                <Keyboard position={[-10, 0.1, 10]} scale={0.1} type="dynamic" />
                <MacBook position={[10, 0.1, 10]} scale={0.1} type="dynamic" />
                {socials.map((social) => (
                  <SocialPedestal
                    key={social.id}
                    label={social.label}
                    url={social.url}
                    position={social.position}
                    icon={social.icon}
                  />
                ))}
              </>
            )}
          </Suspense>
          
          {/* Ground - flat collider */}
          <RigidBody type="fixed" colliders="cuboid">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <planeGeometry args={[180, 180]} />
              <meshStandardMaterial 
                color="#f4d7a8"
                metalness={0.05}
                roughness={0.85}
                envMapIntensity={0.3}
              />
            </mesh>
          </RigidBody>

            

        </Physics>

        {/* Camera Controller - follows bike */}
        {!useOrbitControls && started && (
          <CameraController 
            targetRef={bikeRef}
            cameraAngle={cameraAngle}
            offset={10}
            height={7}
            sideOffset={1.4}
            smoothness={0.12}
          />
        )}

        {/* OrbitControls - for testing (toggle with C key) */}
        {useOrbitControls && started && <OrbitControls enableDamping dampingFactor={0.08} />}

        {/* Ground instruction text */}
        {started && (
          <Text
            position={[0, 0.05, -3]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.6}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
            outlineWidth={0.02}
            outlineColor="#0f172a"
          >
            USE ARROW KEYS TO MOVE
          </Text>
        )}

        {/* Environment - Sunny day atmosphere */}
        <Environment preset="sunset" background />
        <fog attach="fog" args={['#c7e2f5', 18, 75]} />
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
        <div>• ↑ - Forward</div>
        <div>• ↓ - Backward</div>
        <div>• ← - Turn Left</div>
        <div>• → - Turn Right</div>
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
