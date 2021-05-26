import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: spacing(1),
    width: spacing(4),
    borderRadius: '50px',
    marginRight: spacing(1),
  },
  accepted: {
    background: '#10B981',
  },
  rejected: {
    background: '#EF4444',
  },
  default: {
    background: '#D1D5DB',
  },
}))
const ChipProgress = ({ model, ...props }) => {
  const classes = useStyles()
  console.log(model)
  return <Box className={clsx(classes.root, classes[model ?? 'default'])} {...props}></Box>
}
ChipProgress.propTypes = {
  model: PropTypes.string,
}
export default ChipProgress
