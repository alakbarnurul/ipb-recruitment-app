import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import PropTypes from 'prop-types'

const FieldText = props => {
  const { name, label, ...rest } = props
  return <Field component={TextField} name={name} label={label} {...rest} />
}
FieldText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  formikProps: PropTypes.object,
}
export default FieldText
