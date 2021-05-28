import React from 'react'
import { Typography, Button, Grid, LinearProgress, Box } from '@material-ui/core'
import Field from '@/src/components/Field'
import { Formik, Form } from 'formik'
// import useCurrentUser from '@/hooks/useCurrentUser'
// import axios from 'axios'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
// import { Alert } from '@material-ui/lab'

const FormProfile = ({ userData }) => {
  // const { currentAuthToken } = useCurrentUser()
  // const [alertMessage, setAlertMessage] = useState({ status: '', message: '' })
  // const [showAlert, setShowAlert] = useState(false)
  const initialValues = {
    fullName: userData?.fullName ?? '',
    gender: userData?.gender ?? '',
    nim: userData?.nim ?? '',
    yearOfCollege: userData?.yearOfCollege ?? '',
    email: userData?.email ?? '',
    birthDate: userData?.birthDate ?? '',
    faculty: userData?.faculty ?? '',
    department: userData?.department ?? '',
    phoneNumber: userData?.phoneNumber ?? '',
  }
  const validationSchema = Yup.object({
    fullName: Yup.string().required('* Wajib diisi'),
    gender: Yup.string()
      .transform((_, value) => value.title)
      .required('* Wajib diisi'),
    nim: Yup.string().required('* Wjib diisi'),
    yearOfCollege: Yup.string()
      .transform((_, value) => value.title)
      .required('* Wajib diisi'),
    email: Yup.string('* Wajib diisi').email().required('* Wajib diisi'),
    birthDate: Yup.string().required('* Wajib diisi'),
    faculty: Yup.string()
      .transform((_, value) => value.title)
      .required('* Wajib diisi'),
    department: Yup.string()
      .transform((_, value) => value.title)
      .required('* Wajib diisi'),
    phoneNumber: Yup.string().required('* Wajib diisi'),
  })
  const handleUpdateProfile = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
    }, 2000)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleUpdateProfile}>
      {formikProps => (
        <Form>
          {formikProps.isSubmitting && (
            <Box mb={4}>
              <LinearProgress />
            </Box>
          )}
          {/* Notes : Show alert for feedback */}
          {/* {showAlert && (
            <Box mb={4}>
              <Alert severity={alertMessage.status}>
                <Typography variant='body2'>{alertMessage.message}</Typography>
              </Alert>
            </Box>
          )} */}
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Field
                type='text'
                model='textfield'
                label='Nama lengkap'
                name='fullName'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                options={[{ title: 'Laki-laki' }, { title: 'Perempuan' }]}
                model='autocomplete'
                label='Jenis Kelamin'
                name='gender'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                model='textfield'
                type='text'
                label='NIM'
                name='nim'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                options={[
                  { title: '50' },
                  { title: '51' },
                  { title: '52' },
                  { title: '53' },
                  { title: '54' },
                  { title: '55' },
                ]}
                model='autocomplete'
                label='Angkatan'
                name='yearOfCollege'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                type='email'
                model='textfield'
                label='Email Address'
                name='email'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                model='datepicker'
                label='Tanggal Lahir'
                name='birthDate'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                options={[
                  { title: 'FMIPA' },
                  { title: 'FAPERTA' },
                  { title: 'FEM' },
                  { title: 'FAPET' },
                  { title: 'FPIK' },
                  { title: 'FAHUTAN' },
                  { title: 'FKH' },
                  { title: 'FATETA' },
                ]}
                model='autocomplete'
                label='Fakultas'
                name='faculty'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                options={[
                  { title: 'Ilmu Komputer' },
                  { title: 'Statistika' },
                  { title: 'Matematika' },
                  { title: 'Teknologi Pangan' },
                  { title: 'Teknologi Perairan' },
                ]}
                model='autocomplete'
                label='Departemen'
                name='department'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Field
                type='text'
                model='textfield'
                label='Contact'
                name='phoneNumber'
                variant='standard'
                autoComplete='off'
                formikProps={formikProps}
              />
            </Grid>
            <Grid item>
              <Button disabled={formikProps.isSubmitting} color='primary' type='submit' fullWidth variant='contained'>
                <Typography variant='subtitle2'>Update</Typography>
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
FormProfile.propTypes = {
  userData: PropTypes.object,
}
export default FormProfile
