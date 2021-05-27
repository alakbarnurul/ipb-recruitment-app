import React from 'react'
import { Box, Grid } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import CardCampaign from '@/src/components/CardCampaign'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageProgress from '@/src/components/PageProgress'
import PropTypes from 'prop-types'
import prisma from '@/utils/prisma'
import { School } from '@material-ui/icons'
import PageEmpty from '@/src/components/PageEmpty'

export async function getServerSideProps() {
  const rawCampaigns = await prisma.campaign.findMany({
    include: {
      Organization: true,
    },
  })
  const campaigns = rawCampaigns.map(campaign => ({
    ...campaign,
    dateClosed: campaign?.dateClosed?.toISOString().split('T')[0],
    createdAt: campaign?.createdAt?.toISOString().split('T')[0],
    Organization: {
      ...campaign?.Organization,
      startPeriod: campaign?.Organization?.startPeriod?.toISOString().split('T')[0],
      endPeriod: campaign?.Organization?.endPeriod?.toISOString().split('T')[0],
    },
  }))
  if (!campaigns) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      campaigns,
    },
  }
}

export default function Home({ campaigns }) {
  const { currentUser } = useCurrentUser()
  if (currentUser === null) {
    return <PageProgress />
  }
  if (campaigns.length === 0) {
    return <PageEmpty icon={<School />} message='Open Recruitment tidak tersedia, mohon untuk kembali lagi nanti.' />
  }
  return (
    <Box>
      <Container header={<NavigationTop />} footer={<NavigationBottom />}>
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Grid container direction='column' spacing={5} alignItems='center'>
            {campaigns.map(campaign => (
              <Grid key={campaign.id} item>
                <CardCampaign campaignContent={campaign} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
Home.propTypes = {
  campaigns: PropTypes.array,
}
