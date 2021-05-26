import React, { useEffect } from 'react'
import { Field } from 'formik'
import { DatePicker } from 'formik-material-ui-pickers'
import PropTypes from 'prop-types'

const FieldDatePicker = props => {
  const { name, label, formikProps, ...rest } = props
  const { setFieldValue } = formikProps
  //   Notes : Assign default value for DatePicker
  useEffect(() => {
    setFieldValue(name, '2021-01-01')
  }, [])
  return <Field component={DatePicker} format='dd MMM yyyy' name={name} label={label} {...rest} />
}
FieldDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  formikProps: PropTypes.object,
}
export default FieldDatePicker
