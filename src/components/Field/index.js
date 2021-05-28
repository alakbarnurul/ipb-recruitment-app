import React from 'react'
import PropTypes from 'prop-types'
import FieldText from '@/src/components/Field/FieldText'
import FieldAutocomplete from '@/src/components/Field/FieldAutocomplete'
import FieldCheckbox from '@/src/components/Field/FieldCheckbox'
import FieldTextArea from '@/src/components/Field/FieldTextArea'
import FieldRadio from '@/src/components/Field/FieldRadio'
import FieldDatePicker from '@/src/components/Field/FieldDatePicker'
import FieldUploadFile from '@/src/components/Field/FieldUploadFile'

const Field = props => {
  // Notes : Prop formikProps hanya dikirim bagi Filed yang membutuhkan
  const { model, options, filesLimit, variant, fullWidth, formikProps, type, ...rest } = props
  switch (model) {
    case 'textfield':
      return <FieldText variant={variant} fullWidth={fullWidth} type={type} {...rest} />
    case 'textarea':
      return <FieldTextArea variant={variant} fullWidth={fullWidth} multiline rows={3} options={options} {...rest} />
    case 'autocomplete':
      return <FieldAutocomplete variant={variant} options={options} formikProps={formikProps} {...rest} />
    case 'checkbox':
      return <FieldCheckbox formikProps={formikProps} options={options} {...rest} />
    case 'radio':
      return <FieldRadio formikProps={formikProps} options={options} {...rest} />
    case 'datepicker':
      return <FieldDatePicker variant={variant} fullWidth={fullWidth} formikProps={formikProps} {...rest} />
    case 'file':
      return (
        <FieldUploadFile
          variant={variant}
          formikProps={formikProps}
          filesLimit={filesLimit}
          fullWidth={fullWidth}
          {...rest}
        />
      )
    default:
      return null
  }
}

Field.propTypes = {
  type: PropTypes.string,
  model: PropTypes.string,
  options: PropTypes.array,
  formikProps: PropTypes.object,
  filesLimit: PropTypes.number,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
}

Field.defaultProps = {
  variant: 'outlined',
  fullWidth: true,
}

export default Field
