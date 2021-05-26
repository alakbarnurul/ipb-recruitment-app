import React, { useEffect, useState } from 'react'
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
  success: {
    color: '#FFFFFF',
    background: '#10B981',
  },
  error: {
    color: '#FFFFFF',
    background: '#EF4444',
  },
  warning: {
    color: '#FFFFFF',
    background: '#F59E0B',
  },
}))
const Chip = props => {
  const classes = useStyles()
  const { model, label, className } = props
  const [status, setStatus] = useState(model.toLowerCase())
  useEffect(() => {
    switch (status) {
      case 'waiting':
        setStatus('warning')
        break
      case 'accepted':
        setStatus('success')
        break
      case 'rejected':
        setStatus('error')
        break
      default:
        setStatus('default')
    }
  }, [])
  return (
    <MuiChip
      className={clsx(classes[status], className)}
      label={<Typography className={classes.label}>{label}</Typography>}
    />
  )
}
Chip.propTypes = {
  model: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.object,
}
export default Chip
