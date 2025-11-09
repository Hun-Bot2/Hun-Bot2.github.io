import { create } from 'zustand'

const useStore = create((set) => ({
  // Bike state
  bikePosition: [0, 0, 0],
  bikeRotation: 0,
  bikeVelocity: [0, 0, 0],
  
  // Project/Hotspot state
  activeProject: null,
  nearbyHotspots: [],
  
  // UI state
  showControls: true,
  isPaused: false,
  
  // Theme
  isDarkMode: true,
  
  // Actions
  setBikePosition: (position) => set({ bikePosition: position }),
  setBikeRotation: (rotation) => set({ bikeRotation: rotation }),
  setBikeVelocity: (velocity) => set({ bikeVelocity: velocity }),
  
  setActiveProject: (project) => set({ activeProject: project }),
  setNearbyHotspots: (hotspots) => set({ nearbyHotspots: hotspots }),
  
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))

export default useStore
