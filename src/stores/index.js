import create from 'zustand'

const useBreakpointsState = create((set) => ({
  isViewUpMd: false,
  isViewDownMd: false,
  setIsViewUpMd: (value) => set(() => ({ isViewUpMd: value })),
  setIsViewDownMd: (value) => set(() => ({ isViewDownMd: value })),
}))

export { useBreakpointsState }
