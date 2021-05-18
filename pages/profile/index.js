import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageWarning from '@/src/components/PageWarning'
import PageProgress from '@/src/components/PageProgress'

export default function Profile() {
  const { currentUser, setLogout } = useCurrentUser()
  if (currentUser === null) {
    return <PageProgress />
  }
  if (currentUser === undefined) {
    return <PageWarning />
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box py={6} textAlign='center'>
        <Typography variant='subtitle1'>Welcome to Your Profile!</Typography>
        <Typography variant='h2'>Have Fun!</Typography>
        <Button onClick={() => setLogout(true)} type='button' variant='outlined'>
          Logout
        </Button>
      </Box>
    </Container>
  )
}
