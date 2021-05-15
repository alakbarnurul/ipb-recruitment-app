import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@/components/Button'
import { LinearProgress, Grid, Typography, Box } from '@material-ui/core'
import Link from 'next/link'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

const FormRegister = (props) => {
  const [alertMessage, setAlertMessage] = useState({ status: '', message: '' })
  const [showAlert, setShowAlert] = useState(false)
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Your full name required'),
    email: Yup.string().email().required('Email required'),
    password: Yup.string().required('Password required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Password does not match')
      .required('Confirmation password required'),
  })
  const handleRegister = async ({ fullName, email, password }, { setSubmitting }) => {
    await axios
      .post('/api/auth/register', { fullName, email, password })
      .then((response) => {
        console.log(response)
        setAlertMessage({ status: 'success', message: 'Successfully registered' })
      })
      .catch((error) => {
        console.log(error.response)
        setAlertMessage({ status: 'error', message: 'Failed to register' })
      })
    setShowAlert(true)
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
      {({ submitForm, isSubmitting }) => (
        //   Notes : submitForm dan isSubmitting adalah bagian dari formikProps
        <Form {...props}>
          {isSubmitting && (
            <Box my={3}>
              <LinearProgress />
            </Box>
          )}
          <Box my={3} textAlign='left'>
            <Typography variant='body1'>Have a nice day</Typography>
          </Box>
          {showAlert && (
            <Box my={3}>
              <Alert severity={alertMessage.status}>{alertMessage.message}</Alert>
            </Box>
          )}
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Field variant='outlined' fullWidth={true} component={TextField} name='fullName' type='text' label='Full Name' />
            </Grid>
            <Grid item>
              <Field variant='outlined' fullWidth={true} component={TextField} name='email' type='email' label='Email' />
            </Grid>
            <Grid item>
              <Field variant='outlined' fullWidth={true} component={TextField} type='password' label='Password' name='password' />
            </Grid>
            <Grid item>
              <Field
                variant='outlined'
                fullWidth={true}
                component={TextField}
                type='password'
                label='Password'
                name='passwordConfirm'
              />
            </Grid>
            <Grid item>
              <Button fullWidth={true} type='submit' variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
                <Typography variant='subtitle1'>Register</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Box textAlign='right'>
                <Typography variant='body2'>
                  Do you ave an account?{' '}
                  <Link href='/'>
                    <a>Login</a>
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

export default FormRegister
