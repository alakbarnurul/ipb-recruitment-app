import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@/components/Button'
import { LinearProgress, Grid, Typography, Box } from '@material-ui/core'
import Link from 'next/link'

const FormLogin = (props) => {
  const initialValues = {
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email required'),
    password: Yup.string().required('Password required'),
  })
  const handleLogin = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
    }, 2000)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
      {({ submitForm, isSubmitting }) => (
        //   Notes : submitForm dan isSubmitting adalah bagian dari formikProps
        <Form {...props}>
          {isSubmitting && (
            <Box my={3}>
              <LinearProgress />
            </Box>
          )}
          <Box my={3} textAlign='left'>
            <Typography variant='body1'>Please login with your student email (@apps.ipb.ac.id)</Typography>
          </Box>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Field variant='outlined' fullWidth={true} component={TextField} name='email' type='email' label='Email' />
            </Grid>
            <Grid item>
              <Field variant='outlined' fullWidth={true} component={TextField} type='password' label='Password' name='password' />
            </Grid>
            <Grid item>
              <Button fullWidth={true} type='submit' variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
                <Typography variant='subtitle1'>Login</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Box textAlign='right'>
                <Typography variant='body2'>
                  Don not have an account?{' '}
                  <Link href='/register'>
                    <a>Register</a>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default FormLogin
