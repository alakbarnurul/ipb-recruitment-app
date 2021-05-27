import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'
import FormApplyCampaign from '@/components/FormApplyCampaign'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import prisma from '@/utils/prisma'

export async function getStaticPaths() {
  const rawCampaignForm = await prisma.form.findMany()
  const paths = rawCampaignForm.map(campaignForm => ({ params: { id: campaignForm.id } }))
  return { paths, fallback: false }
}
export async function getStaticProps({ params }) {
  const rawCampaign = await prisma.form.findMany({
    where: {
      id: params.id,
    },
  })
  const campaignForm = rawCampaign.map(campaignForm => ({
    ...campaignForm,
    createdAt: campaignForm?.createdAt?.toISOString().split('T')[0],
  }))
  if (!campaignForm) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      campaignForm: campaignForm[0],
    },
  }
}

export default function FormCampaign({ campaignForm }) {
  const { fields } = campaignForm
  const initSchema = {}
  const initValues = {}
  for (const { type, name } of fields) {
    // Notes : Assign for dynamic initialValues
    initValues[name] = type === ('checkbox' || 'file') ? [] : ''
    // Notes : Assign for dynamic validationSchema
    if (type === 'autocomplete') {
      initSchema[name] = Yup.string()
        .transform((_, originalValue) => originalValue.title)
        .required('* Wajib diisi')
    } else if (['checkbox', 'file'].includes(type)) {
      initSchema[name] = Yup.array().min(1, '* Wajib diisi')
    } else {
      initSchema[name] = Yup.string().required('* Wajib diisi')
    }
  }
  return (
    <Container header={<NavigationTop />} footer={<NavigationBottom />}>
      <Box textAlign='center' mt={2}>
        <Typography variant='subtitle1'>Silakan isi form di bawah untuk Apply</Typography>
      </Box>
      <Box py={3} textAlign='center'>
        <FormApplyCampaign campaignFields={fields} initValues={initValues} initSchema={initSchema} />
      </Box>
    </Container>
  )
}

FormCampaign.propTypes = {
  campaignForm: PropTypes.object,
}
