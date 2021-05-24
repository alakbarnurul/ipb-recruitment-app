import React from 'react'
import PropTypes from 'prop-types'
import FieldText from '@/src/components/Field/FieldText'
import FieldAutocomplete from '@/src/components/Field/FieldAutocomplete'
import FieldCheckbox from '@/src/components/Field/FieldCheckbox'
import FieldTextArea from '@/src/components/Field/FieldTextArea'
import FieldRadio from '@/src/components/Field/FieldRadio'

const FieldCampaign = (props) => {
  // Notes : Prop formikProps hanya dikirim bagi Filed yang membutuhkan
  const { type, options, formikProps, ...rest } = props
  switch (type) {
    case 'textfield':
      return <FieldText variant='outlined' fullWidth={true} {...rest} />
    case 'textarea':
      return <FieldTextArea variant='outlined' fullWidth={true} multiline rows={3} options={options} {...rest} />
    case 'autocomplete':
      return <FieldAutocomplete variant='outlined' options={options} formikProps={formikProps} {...rest} />
    case 'checkbox':
      return <FieldCheckbox formikProps={formikProps} options={options} {...rest} />
    case 'radio':
      return <FieldRadio formikProps={formikProps} options={options} {...rest} />
    default:
      return null
  }
}

FieldCampaign.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  formikProps: PropTypes.object,
}

export default FieldCampaign
