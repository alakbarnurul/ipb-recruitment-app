import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import { DirectionsRun } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import FormLogin from '@/components/FormLogin'
import { useRouter } from 'next/router'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageProgress from '@/src/components/PageProgress'

const useStyles = makeStyles(({ spacing }) => ({
  keyIcon: {
    fontSize: spacing(6),
    marginBottom: spacing(1),
  },
}))
export default function Index() {
  const classes = useStyles()
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  if (currentUser === null) {
    return <PageProgress />
  }
  if (currentUser) {
    router.push('/profile')
    return <PageProgress />
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      {/* Header */}
      <Box mt={5} textAlign='center'>
        <DirectionsRun className={classes.keyIcon} />
        <Typography variant='subtitle1'>Login to apply & find your passion!</Typography>
      </Box>
      {/* Main */}
      <Box mt={5}>
        <FormLogin />
      </Box>
    </Container>
  )
}
