import React from 'react'
import PropTypes from 'prop-types'
import FieldText from '@/components/Fields/FieldText'
import FieldAutocomplete from '@/components/Fields/FieldAutocomplete'
import FieldCheckbox from '@/components/Fields/FieldCheckbox'
import FieldTextArea from '@/components/Fields/FieldTextArea'
import FieldRadio from '@/components/Fields/FieldRadio'

const FieldCampaign = (props) => {
  const { type, options, ...rest } = props
  switch (type) {
    case 'textfield':
      return <FieldText variant='outlined' fullWidth={true} {...rest} />
    case 'textarea':
      return <FieldTextArea variant='outlined' fullWidth={true} multiline rows={3} {...rest} options={options} />
    case 'autocomplete':
      return <FieldAutocomplete variant='outlined' options={options} {...rest} />
    case 'checkbox':
      return <FieldCheckbox {...rest} options={options} />
    case 'radio':
      return <FieldRadio {...rest} options={options} />
    default:
      return null
  }
}

FieldCampaign.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
}

export default FieldCampaign
