import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isMobile: window.innerWidth < 1280,
  isMobileMenuOpen: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }), // Function to close the sidebar
}));

// Add resize listener to update isMobile state
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    useSidebarStore.getState().setIsMobile(window.innerWidth < 1280);
    if (window.innerWidth >= 1280) {
      useSidebarStore.getState().closeMobileMenu();
    }
  });
}

export default useSidebarStore;