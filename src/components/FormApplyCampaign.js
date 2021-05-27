import React, { useState } from 'react'
import { Typography, Button, Grid, LinearProgress, Box } from '@material-ui/core'
import Field from '@/src/components/Field'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import useCurrentUser from '@/hooks/useCurrentUser'
import axios from 'axios'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const FormApplyCampaign = ({ campaignFields, initValues, initSchema }) => {
  const router = useRouter()
  const { currentAuthToken } = useCurrentUser()
  const [alertMessage, setAlertMessage] = useState({ status: '', message: '' })
  const [showAlert, setShowAlert] = useState(false)
  const initialValues = {
    ...initValues,
  }
  const validationSchema = Yup.object({
    ...initSchema,
  })
  const handleApply = async (values, { setSubmitting }) => {
    await axios
      .post(`/api/campaign/apply/${router.query.id}`, { formData: { ...values }, authToken: currentAuthToken })
      .then(response => {
        setAlertMessage({ status: 'success', message: 'Apply successfully! Check your application history.' })
        console.log(response)
      })
      .catch(error => {
        setAlertMessage({ status: 'error', message: 'Sorry, you already applied!' })
        console.log(error.response)
      })
    setShowAlert(true)
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleApply}>
      {formikProps => (
        <Form>
          {formikProps.isSubmitting && (
            <Box mb={4}>
              <LinearProgress />
            </Box>
          )}
          {/* Notes : Show alert for feedback */}
          {showAlert && (
            <Box mb={4}>
              <Alert severity={alertMessage.status}>
                <Typography variant='body2'>{alertMessage.message}</Typography>
              </Alert>
            </Box>
          )}
          <Grid container direction='column' spacing={3}>
            {campaignFields.map(field => (
              <Grid item key={field.name}>
                <Field formikProps={formikProps} {...field} />
              </Grid>
            ))}
            <Grid item>
              <Button color='primary' type='submit' fullWidth variant='contained'>
                <Typography variant='subtitle2'>Apply</Typography>
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
FormApplyCampaign.propTypes = {
  campaignFields: PropTypes.array,
  initValues: PropTypes.object,
  initSchema: PropTypes.object,
}
export default FormApplyCampaign
