import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import Link from 'next/link'
import { useStoreBreakpoints } from '@/src/stores/main'
import shallow from 'zustand/shallow'

const PageWarning = () => {
  const [setIsViewDownMd, setIsViewUpMd] = useStoreBreakpoints((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box py={20} textAlign='center'>
        <Typography variant='subtitle1'>Hello friend, long time no see.</Typography>
        <Box mt={2} />
        <Link href='/' replace passHref>
          <a>
            <Typography variant='h2'>Login to Manage Your Account</Typography>
          </a>
        </Link>
      </Box>
    </Container>
  )
}

export default PageWarning
