import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import { useStoreBreakpoints } from '@/src/stores/main'
import shallow from 'zustand/shallow'
import useCurrentUser from '@/hooks/useCurrentUser'
import WarningPage from '@/components/WarningPage'
import ProgressPage from '@/components/ProgressPage'

export default function History() {
  const [setIsViewDownMd, setIsViewUpMd] = useStoreBreakpoints((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { currentUser } = useCurrentUser()
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  if (currentUser === null) {
    return <ProgressPage />
  }
  if (currentUser === undefined) {
    return <WarningPage />
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box py={6} textAlign='center'>
        <Typography variant='subtitle1'>Welcome to Your History!</Typography>
        <Typography variant='h2'>Have Fun!</Typography>
      </Box>
    </Container>
  )
}
