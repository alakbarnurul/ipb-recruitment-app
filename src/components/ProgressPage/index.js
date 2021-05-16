import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'

const ProgressPage = (props) => {
  return (
    <Container {...props}>
      <Box mt={24} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default ProgressPage
