import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import PropTypes from 'prop-types'

const FieldTextArea = (props) => {
  const { name, label, ...rest } = props
  return <Field component={TextField} name={name} label={label} {...rest} />
}
FieldTextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  formikProps: PropTypes.object,
}
export default FieldTextArea
