import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import Link from 'next/link'
import { useBreakpointsState } from '@/src/stores/main'
import shallow from 'zustand/shallow'

export default function __Page() {
  const [setIsViewDownMd, setIsViewUpMd] = useBreakpointsState((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box py={6} textAlign='center'>
        <Link href='/' replace passHref>
          <a>
            <Typography variant='h2'>Back to home page</Typography>
          </a>
        </Link>
      </Box>
    </Container>
  )
}
