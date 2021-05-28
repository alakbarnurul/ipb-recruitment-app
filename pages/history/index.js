import React from 'react'
import { Box } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageWarning from '@/src/components/PageWarning'
import PageProgress from '@/src/components/PageProgress'
import CardHistory from '@/components/CardHistory'
import prisma from '@/utils/prisma'
import PropTypes from 'prop-types'
import PageEmpty from '@/src/components/PageEmpty'
import { Assessment } from '@material-ui/icons'
import axios from 'axios'

export async function getServerSideProps(ctx) {
  const authToken = ctx.req.cookies['auth-token']
  let currentUser = {}
  await axios
    .post(`${process.env.BASE_URL}/api/user/student`, { authToken })
    .then(response => {
      const { user } = response.data
      currentUser = user
    })
    .catch(error => console.log(error.response))
  const rawHistory = await prisma.history.findMany({
    where: {
      studentId: currentUser.id,
    },
    include: {
      Campaign: {
        include: {
          Organization: true,
        },
      },
    },
  })
  const history = rawHistory.map(history => ({
    ...history,
    applyDate: history?.applyDate?.toISOString().split('T')[0],
    createdAt: history?.createdAt?.toISOString().split('T')[0],
    Campaign: {
      ...history?.Campaign,
      dateClosed: history?.Campaign?.dateClosed?.toISOString().split('T')[0],
      createdAt: history?.Campaign?.createdAt?.toISOString().split('T')[0],
      Organization: {
        ...history?.Campaign?.Organization,
        startPeriod: history?.Campaign?.Organization?.startPeriod?.toISOString().split('T')[0],
        endPeriod: history?.Campaign?.Organization?.endPeriod?.toISOString().split('T')[0],
      },
    },
  }))
  const briefHistoryData = history.map(data => ({
    id: data?.id,
    positions: data?.formData?.positions ?? '',
    applyDate: data?.applyDate,
    status: data?.status,
    campaign: {
      id: data?.Campaign?.id,
      name: data?.Campaign?.title,
      timeline: data?.Campaign?.timeline,
    },
    organization: {
      name: data?.Campaign?.Organization?.name,
      cabinet: data?.Campaign?.Organization?.cabinet,
    },
  }))
  if (!briefHistoryData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      briefHistoryData,
    },
  }
}
export default function History({ briefHistoryData }) {
  const { currentUser } = useCurrentUser()
  if (currentUser === null) {
    return <PageProgress />
  }
  if (currentUser === undefined) {
    return <PageWarning />
  }
  if (briefHistoryData.length === 0) {
    return (
      <PageEmpty
        icon={<Assessment />}
        message='History lamaran Open Recruitment belum ada, mohon untuk apply terlebih dahulu.'
      />
    )
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box textAlign='center'>
        {briefHistoryData.map(history => (
          <CardHistory key={history.id} historyData={history} />
        ))}
      </Box>
    </Container>
  )
}
History.propTypes = {
  briefHistoryData: PropTypes.array,
}
