import React from 'react'
import { Field } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import PropTypes from 'prop-types'
import { Box, FormControl, FormGroup, FormHelperText, Typography } from '@material-ui/core'

const FieldCheckbox = (props) => {
  const { name, label, options, formikProps, ...rest } = props
  const { touched, errors } = formikProps
  return (
    <Box display='flex' flexDirection='column'>
      <FormControl required error={touched[name] && !!errors[name]} component='fieldset'>
        <Box textAlign='left' mb={1}>
          <Typography variant='body1'>{label}</Typography>
        </Box>
        <FormGroup>
          {options.map((option) => (
            <Field
              key={option.value}
              value={option.value}
              component={CheckboxWithLabel}
              type='checkbox'
              Label={{ label: option.title }}
              name={name}
              {...rest}
            />
          ))}
        </FormGroup>
        <FormHelperText>{touched[name] && !!errors[name] ? errors[name] : undefined}</FormHelperText>
      </FormControl>
    </Box>
  )
}
FieldCheckbox.propTypes = {
  content: PropTypes.array,
  name: PropTypes.string,
  options: PropTypes.array,
  formikProps: PropTypes.object,
  label: PropTypes.string,
}
export default FieldCheckbox
