import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardMedia, Typography, Chip, Button } from '@material-ui/core'
import { School } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PageProgress from '@/src/components/PageProgress'
import useCurrentUser from '@/hooks/useCurrentUser'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import Container from '@/src/components/Layout/Container'
import { PrismaClient } from '@prisma/client'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import Link from 'next/link'

const prisma = new PrismaClient()
const useStyles = makeStyles(({ spacing }) => ({
  root: {},
  organizationIcon: {
    marginRight: spacing(2),
  },
  subTitle: {
    marginBottom: spacing(2),
  },
  chipPosition: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
}))
export async function getStaticPaths() {
  const rawCampaign = await prisma.campaign.findMany()
  const paths = rawCampaign.map(campaign => ({ params: { id: campaign.id } }))
  return { paths, fallback: false }
}
export async function getStaticProps({ params }) {
  const rawCampaign = await prisma.campaign.findMany({
    where: {
      id: params.id,
    },
    include: {
      Organization: true,
      campaignForm: {
        select: {
          id: true,
        },
      },
    },
  })
  const campaign = rawCampaign.map(campaign => ({
    ...campaign,
    dateClosed: campaign?.dateClosed?.toISOString().split('T')[0],
    createdAt: campaign?.createdAt?.toISOString().split('T')[0],
    Organization: {
      ...campaign?.Organization,
      startPeriod: campaign?.Organization?.startPeriod?.toISOString().split('T')[0],
      endPeriod: campaign?.Organization?.endPeriod?.toISOString().split('T')[0],
    },
  }))
  if (!campaign) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      campaign,
    },
  }
}

export default function Campaign({ campaign }) {
  const { Organization, imageUrl, title, timeline, description, generalRequirement, positions, campaignForm } = campaign[0]
  const { currentUser } = useCurrentUser()
  const classes = useStyles()
  if (currentUser === null) {
    return <PageProgress />
  }
  return (
    <Box>
      <Container header={<NavigationTop />} footer={<NavigationBottom />}>
        <Card>
          <CardMedia image={imageUrl} title='Campaign Banner' style={{ paddingTop: '56.25%' }} />
        </Card>
        <Box mt={2}>
          <Typography variant='h1'>{title}</Typography>
          <Box display='flex' alignItems='center' mt={1}>
            <School className={classes.organizationIcon} />
            <Typography variant='body1'>{Organization.name}</Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Box mb={2}>
            <Typography className={classes.subTitle} variant='subtitle2'>
              Timeline
            </Typography>
            <Timeline align='alternate'>
              {timeline?.map((date, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color='primary' />
                    {index + 1 < timeline.length && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography variant='body1'>{date?.label}</Typography>
                      <Typography variant='subtitle2'>{date?.date}</Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          <Box>
            <Typography className={classes.subTitle} variant='subtitle2'>
              Deskripsi
            </Typography>
            <Typography variant='body2' align='justify'>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Box>
            <Typography className={classes.subTitle} variant='subtitle2'>
              Prasyarat
            </Typography>
            <Typography variant='body2'>{generalRequirement}</Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Box>
            <Typography className={classes.subTitle} variant='subtitle2'>
              Divisi
            </Typography>
            {positions?.map(position => (
              <Chip
                className={classes.chipPosition}
                key={position}
                label={<Typography variant='body1'>{position}</Typography>}
                color='default'
              />
            ))}
          </Box>
        </Box>
        <Box mt={5}>
          <Link href={`/home/campaign/form/${campaignForm?.id}`} passHref>
            <Button variant='contained' color='primary' fullWidth>
              <Typography variant='subtitle2'>Apply</Typography>
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
Campaign.propTypes = {
  campaign: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
