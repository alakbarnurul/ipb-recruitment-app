import React from 'react'
import { Box } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import CardCampaign from '@/src/components/CardCampaign'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import useCurrentUser from '@/hooks/useCurrentUser'
import PageProgress from '@/src/components/PageProgress'

const dataCampaigns = [
  {
    _id: 'x0981;',
    imageUrl: '/images/pictures/picture01.jpg',
    title: 'IT Today 2021',
    status: true,
    dateClosed: '2020-01-01',
    description: ` IT Today 2021 is an international technology event held by the Department of Computer Science IPB collaborating with IPB
    University Computer Science Student Association. This year, IT Today brings "The Synergy Between Technology and Agro-Maritime
    5.0" as a theme. Presenting various events such as International Seminar, Community Seminars, and Workshop along with
    Competition such as HackToday, UXToday, and IT Business Competition.`,
    organizer: {
      _id: 'y0891',
      name: 'Himalkom 20/21 - Kabinet Notion',
      periodeStart: '2020-06-06',
      periodeEnd: '2021-06-06',
      email: 'himalkom@ipb.oprec.id',
      department: 'Ilmu Komputer',
      faculty: 'FMIPA',
    },
  },
  {
    _id: 'x1981;',
    imageUrl: '/images/pictures/picture02.jpg',
    title: 'Pengurus BEM Fema 2021',
    status: false,
    dateClosed: '2020-01-01',
    description: ` EM FEMA Kabinet HERO memiliki tagline yang akan menemani perjalanan ini ke depannya. 
    Dengan semangat tagline ini, ke depannya diharapkan Kabinet HERO dapat berproses bersama dari nol unt
    uk menjadi pahlawan FEMA dengan dedikasi tinggi serta torehan-torehan prestasi membanggakan yang kita aka
    n ukir bersama kedepannya.`,
    organizer: {
      _id: 'y0892',
      name: 'BEM Fema 20/21 - Kabinet Hero',
      periodeStart: '2020-06-06',
      periodeEnd: '2021-06-06',
      email: 'bem.fema@ipb.oprec.id',
      department: '-',
      faculty: 'FEMA',
    },
  },
]

export default function Home() {
  const { currentUser } = useCurrentUser()
  if (currentUser === null) {
    return <PageProgress />
  }
  return (
    <Box>
      <Container header={<NavigationTop />} footer={<NavigationBottom />}>
        <Box display='flex' alignItems='center' flexDirection='column'>
          {dataCampaigns.map((data) => (
            <CardCampaign key={data._id} campaignContent={data} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
