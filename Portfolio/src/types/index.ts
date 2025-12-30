import * as THREE from 'three'

// Project types
export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  position: [number, number, number] // x, y, z position in 3D space
}

// Keyboard controls
export interface KeyboardControls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  interact: boolean
}

// Bike Physics Props
export interface BikePhysicsProps {
  onCameraAngleChange?: (updater: (prev: number) => number) => void
}

// Project Monitor Props
export interface ProjectMonitorProps {
  project: Project
  bikePosition: THREE.Vector3
  onInteract: (project: Project) => void
}

// Project Modal Props
export interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

// Camera Controller Props
export interface CameraControllerProps {
  targetRef: React.RefObject<any>
  cameraAngle: number
  offset?: number
  height?: number
  sideOffset?: number
}
