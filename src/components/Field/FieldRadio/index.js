import React, { useState, useEffect } from 'react'
import { Box, FormControlLabel, Radio, Typography } from '@material-ui/core'
import { Field } from 'formik'
import { RadioGroup } from 'formik-material-ui'
import PropTypes from 'prop-types'

const FieldRadio = props => {
  const { name, label, options, formikProps, ...rest } = props
  const { isSubmitting, setFieldValue } = formikProps
  // Notes : Radio button harus menggunakan initial value
  const [value, setValue] = useState(null)
  const handleSetValue = e => setValue(String(e.target.value))
  useEffect(() => {
    // Notes : Radio button harus menggunakan initial value
    setFieldValue(name, String(options[0].value))
  }, [])
  return (
    <Box {...rest}>
      <Box textAlign='left' mb={1}>
        <Typography variant='body1'>{label}</Typography>
      </Box>
      <Field component={RadioGroup} name={name} value={value}>
        {options.map(option => (
          <FormControlLabel
            key={option.title}
            value={String(option.value)}
            onChange={handleSetValue}
            control={<Radio disabled={isSubmitting} />}
            label={option.title}
            disabled={isSubmitting}
          />
        ))}
      </Field>
    </Box>
  )
}
FieldRadio.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  formikProps: PropTypes.object,
  label: PropTypes.string,
}
export default FieldRadio
