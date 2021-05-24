import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import Link from 'next/link'

export default function __Page() {
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
