import React from 'react'
import { Chip as MuiChip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 600,
  },
  accepted: {
    color: '#FFFFFF',
    background: '#10B981',
  },
  rejected: {
    color: '#FFFFFF',
    background: '#EF4444',
  },
  waiting: {
    color: '#FFFFFF',
    background: '#F59E0B',
  },
  onprogress: {
    color: '#FFFFFF',
    background: '#2563EB',
  },
}))
const Chip = props => {
  const classes = useStyles()
  const { model, label, className } = props
  return (
    <MuiChip
      className={clsx(classes[model?.toLowerCase() ?? 'default'], className)}
      label={<Typography className={classes.label}>{label}</Typography>}
    />
  )
}
Chip.propTypes = {
  model: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}
export default Chip
