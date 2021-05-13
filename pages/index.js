import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/components/layouts/Container'
import NavigationTop from '@/components/layouts/NavigationTop'
import NavigationBottom from '@/components/layouts/NavigationBottom'

export default function Index() {
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
