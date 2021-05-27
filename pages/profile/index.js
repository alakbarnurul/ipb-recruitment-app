import React from 'react'
import { Box, Button, Card, CardMedia, CardActionArea } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageWarning from '@/src/components/PageWarning'
import PageProgress from '@/src/components/PageProgress'
import FormProfile from '@/src/components/FormProfile'
import { ExitToApp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import axios from 'axios'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    maxWidth: 104,
    borderRadius: '50%',
    margin: `${spacing(4)}px auto`,
  },
  profilePicture: {
    height: 0,
    paddingTop: 104,
    cursor: 'pointer',
  },
  buttonLogoutIcon: {
    marginLeft: spacing(1.5),
    fontSize: 24,
  },
  input: {
    display: 'none',
  },
}))
export async function getServerSideProps(ctx) {
  const authToken = ctx.req.cookies['auth-token']
  let userData = {}
  await axios
    .post(`${process.env.BASE_URL}/api/user/student`, { authToken })
    .then(response => {
      const { user } = response.data
      userData = user
    })
    .catch(error => console.log(error.response))
  if (!userData) {
    return {
      notFound: true,
    }
  }
  return {
    props: { userData },
  }
}
export default function Profile({ userData }) {
  const { currentUser, setLogout } = useCurrentUser()
  const classes = useStyles()
  if (currentUser === null) {
    return <PageProgress />
  }
  if (currentUser === undefined) {
    return <PageWarning />
  }
  const handleUploadImage = e => {
    console.log(e.target.files)
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box textAlign='center'>
        <Box display='flex' alignItems='center' justifyContent='flex-end'>
          <Button onClick={() => setLogout(true)} type='button' variant='outlined'>
            Logout
            <ExitToApp className={classes.buttonLogoutIcon} />
          </Button>
        </Box>
        <Box>
          <Card className={classes.root}>
            <CardActionArea>
              <input
                onChange={handleUploadImage}
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <CardMedia
                  className={classes.profilePicture}
                  image='/images/pictures/picture02.jpg'
                  title='Click to change your Avatar'
                />
              </label>
            </CardActionArea>
          </Card>
        </Box>
        <FormProfile userData={userData} />
      </Box>
    </Container>
  )
}
Profile.propTypes = {
  userData: PropTypes.object,
}
