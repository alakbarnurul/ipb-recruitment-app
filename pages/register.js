import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import shallow from 'zustand/shallow'
import { useBreakpointsState } from '@/src/stores/main'
import { EmojiPeople } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import FormRegister from '@/components/FormRegister'

const useStyles = makeStyles(({ spacing }) => ({
  keyIcon: {
    fontSize: spacing(6),
    marginBottom: spacing(1),
  },
}))
export default function Register() {
  const classes = useStyles()
  const [setIsViewDownMd, setIsViewUpMd] = useBreakpointsState((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      {/* Header */}
      <Box mt={8} textAlign='center'>
        <EmojiPeople className={classes.keyIcon} />
        <Typography variant='subtitle1'>Kuy! Join with us!</Typography>
      </Box>
      {/* Main */}
      <Box mt={3}>
        <FormRegister />
      </Box>
    </Container>
  )
}