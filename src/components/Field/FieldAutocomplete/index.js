import React from 'react'
import { Field } from 'formik'
import { Autocomplete } from 'formik-material-ui-lab'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

const FieldAutocomplete = props => {
  const { name, label, options, formikProps, ...rest } = props
  const { touched, errors } = formikProps
  return (
    <Field
      name={name}
      disableClearable
      component={Autocomplete}
      options={options}
      getOptionLabel={option => option?.title ?? ''}
      getOptionSelected={option => option.title}
      renderInput={params => (
        <TextField
          {...params}
          name={name}
          {...rest}
          label={label}
          error={touched[name] && !!errors[name]}
          helperText={touched[name] && !!errors[name] ? errors[name] : undefined}
        />
      )}
    />
  )
}
FieldAutocomplete.propTypes = {
  content: PropTypes.array,
  name: PropTypes.string,
  options: PropTypes.array,
  formikProps: PropTypes.object,
  label: PropTypes.string,
}
export default FieldAutocomplete
