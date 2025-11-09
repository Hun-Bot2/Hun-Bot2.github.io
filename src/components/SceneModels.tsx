import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

// 집 (House)
export function House({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/house-6.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 큰 바위 (Large Rock Formation)
export function LargeRock({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/formation-large-rock.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 바위 (Rock Formation)
export function Rock({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/formation-rock.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 키보드 (Mechanical Keyboard)
export function Keyboard({ position = [0, 0, 0], scale = 1, type = 'fixed' as 'fixed' | 'dynamic' }) {
  const { scene } = useGLTF('/models/keyboard.gltf');
  return (
    <RigidBody type={type} colliders="cuboid" mass={type === 'dynamic' ? 0.5 : undefined}>
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 난파선 (Ship Wreck)
export function ShipWreck({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/ship-wreck.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 전나무 (Tree Spruce)
export function TreeSpruce({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/tree-spruce.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 라임나무 (Tree Lime)
export function TreeLime({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/tree-lime.gltf');
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// 맥북 (MacBook)
export function MacBook({ position = [0, 0, 0], scale = 1, type = 'fixed' as 'fixed' | 'dynamic' }) {
  const { scene } = useGLTF('/models/macbook.gltf');
  return (
    <RigidBody type={type} colliders="cuboid" mass={type === 'dynamic' ? 0.2 : undefined}>
      <primitive object={scene.clone()} position={position} scale={scale} />
    </RigidBody>
  );
}

// Preload all models
useGLTF.preload('/models/house-6.gltf');
useGLTF.preload('/models/formation-large-rock.gltf');
useGLTF.preload('/models/formation-rock.gltf');
useGLTF.preload('/models/keyboard.gltf');
useGLTF.preload('/models/ship-wreck.gltf');
useGLTF.preload('/models/tree-spruce.gltf');
useGLTF.preload('/models/tree-lime.gltf');
useGLTF.preload('/models/macbook.gltf');
