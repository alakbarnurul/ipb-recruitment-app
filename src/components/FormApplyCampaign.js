import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import Field from '@/src/components/Field'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const dummyDataField = [
  {
    type: 'textfield',
    name: 'name',
    label: 'Nama Lengkap',
  },
  {
    type: 'autocomplete',
    name: 'faculty',
    label: 'Fakultas',
    options: [{ title: 'FMIPA' }, { title: 'FEM' }, { title: 'FAPERTA' }],
  },
  {
    type: 'checkbox',
    name: 'positions',
    label: 'Pilih divisi yang diminati',
    options: [
      { title: 'Kestari', value: 'kestari' },
      { title: 'Logstran', value: 'logstran' },
      { title: 'Humas', value: 'humas' },
    ],
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Deskripsikan dirimu',
  },
  {
    type: 'radio',
    name: 'comitment',
    label: 'Komitment Anda pada kepengurusan ini',
    options: [
      { title: 1, value: 1 },
      { title: 2, value: 2 },
      { title: 3, value: 3 },
      { title: 4, value: 4 },
    ],
  },
  {
    type: 'datepicker',
    name: 'interviewDate',
    label: 'Pilih jadwal interview',
  },
  {
    type: 'file',
    name: 'files',
    label: 'Unggah berkas Anda',
    filesLimit: 4,
  },
]
const FormApplyCampaign = () => {
  const initialValues = {
    name: '',
    faculty: '',
    positions: [],
    description: '',
    comitment: '',
    interviewDate: '',
    files: [],
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('*) Isi nama lengkap Anda'),
    faculty: Yup.string()
      .transform((value, originalValue) => originalValue.title)
      .required('*) Isi fakultas Anda'),
    positions: Yup.array().min(1, '*) Isi paling sedikit satu divisi'),
    description: Yup.string().required('*) Isi deskripsinya'),
    interviewDate: Yup.string().required('*) Isi jadwal interview'),
    files: Yup.array().min(1, '*) Isi paling sedikit satu berkas'),
  })
  const handleApply = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
    }, 2000)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleApply}>
      {(formikProps) => (
        <Form>
          <Grid container direction='column' spacing={3}>
            {dummyDataField.map((field) => (
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

export default FormApplyCampaign
