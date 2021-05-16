import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import shallow from 'zustand/shallow'
import { useStoreBreakpoints } from '@/src/stores/main'
import { EmojiPeople } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import FormRegister from '@/components/FormRegister'
import { useRouter } from 'next/router'
import useCurrentUser from '@/hooks/useCurrentUser'
import ProgressPage from '@/components/ProgressPage'

const useStyles = makeStyles(({ spacing }) => ({
  keyIcon: {
    fontSize: spacing(6),
    marginBottom: spacing(1),
  },
}))
export default function Register() {
  const classes = useStyles()
  const [setIsViewDownMd, setIsViewUpMd] = useStoreBreakpoints((state) => [state.setIsViewDownMd, state.setIsViewUpMd], shallow)
  const isViewDownMd = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const isViewUpMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  useEffect(() => {
    setIsViewDownMd(isViewDownMd)
    setIsViewUpMd(isViewUpMd)
  }, [isViewDownMd, isViewUpMd])
  if (currentUser === null) {
    return <ProgressPage />
  }
  if (currentUser) {
    router.push('/profile')
    return <ProgressPage />
  }
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
