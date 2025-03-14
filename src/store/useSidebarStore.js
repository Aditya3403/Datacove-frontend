import { create } from 'zustand'; // Use named import for 'create'

const useAppStore = create((set) => ({
  user: null, // Existing user state
  isSidebarOpen: false, // New state for sidebar
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setUser: (user) => set({ user }), // Example of how to set the user
  logout: () => set({ user: null }), // Example of how to log out the user
}));

export default useAppStore;