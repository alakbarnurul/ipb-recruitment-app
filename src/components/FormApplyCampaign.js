import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import Field from '@/src/components/Field'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import useCurrentUser from '@/hooks/useCurrentUser'
import axios from 'axios'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const FormApplyCampaign = ({ campaignFields, initValues, initSchema }) => {
  const router = useRouter()
  const { currentAuthToken } = useCurrentUser()
  const initialValues = {
    ...initValues,
  }
  const validationSchema = Yup.object({
    ...initSchema,
  })
  const handleApply = async (values, { setSubmitting }) => {
    await axios
      .post(`/api/campaign/apply/${router.query.id}`, { formData: { ...values }, authToken: currentAuthToken })
      .then(response => console.log(response))
      .catch(error => console.log(error.response))
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleApply}>
      {formikProps => (
        <Form>
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
