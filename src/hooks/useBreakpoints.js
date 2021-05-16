import { useMediaQuery } from '@material-ui/core'

const useBreakpoints = () => {
  // Notes :  isUp is true if [481px, Infinity) / [md + 1, Infinity]
  // Notes :  isDown is true if [0px, 480px) / [0, md - 1]
  const isUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const isDown = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return { isUp, isDown }
}

export default useBreakpoints
