import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/components/layouts/Container'
import NavigationTop from '@/components/layouts/NavigationTop'
import NavigationBottom from '@/components/layouts/NavigationBottom'
import Link from 'next/link'

export default function Profile() {
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      {/* Notes : Element Box untuk menghindari bug karena header dan foooter yang fixed position */}
      <Box py={2} />
      <Box py={6} textAlign='center'>
        <Typography variant='subtitle1'>Login dulu sebelum masuk ke Profile</Typography>
        <Typography variant='h2'>Halaman Profile</Typography>
        <Box mt={6} />
        <Link href='/' replace passHref>
          <a>
            <Typography variant='h2'>Kembali ke halaman Login</Typography>
          </a>
        </Link>
      </Box>
    </Container>
  )
}
