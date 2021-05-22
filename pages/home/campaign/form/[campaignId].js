import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import FormApplyCampaign from '@/components/FormApplyCampaign'

export default function FormCampaign() {
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box textAlign='center'>
        <Typography variant='subtitle1'>Silakan isi form di bawah</Typography>
      </Box>
      <Box py={6} textAlign='center'>
        <FormApplyCampaign />
      </Box>
    </Container>
  )
}
