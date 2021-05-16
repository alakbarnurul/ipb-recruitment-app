import create from 'zustand'

const useStoreBreakpoints = create((set) => ({
  isViewUpMd: true,
  isViewDownMd: false,
  setIsViewUpMd: (value) => set(() => ({ isViewUpMd: value })),
  setIsViewDownMd: (value) => set(() => ({ isViewDownMd: value })),
}))

export { useStoreBreakpoints }
