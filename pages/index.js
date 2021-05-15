import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import shallow from 'zustand/shallow'
import { useBreakpointsState } from '@/src/stores/main'

export default function Index() {
  const [setIsViewDownMd, setIsViewUpMd] = useBreakpointsState((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      {/* Notes : Element Box untuk menghindari bug karena header dan foooter yang fixed position */}
      <Box py={2} />
      <Box py={6} textAlign='center'>
        <Typography variant='h2'>Halaman Login</Typography>
      </Box>
    </Container>
  )
}
