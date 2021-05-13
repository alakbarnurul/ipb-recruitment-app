import React from 'react'
import clsx from 'clsx'
import { Button as MuiButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  rootButton: {},
}))
const Button = ({ children, className, ...props }) => {
  const classes = useStyles()
  return (
    <MuiButton className={clsx(classes.rootButton, className)} {...props}>
      {children}
    </MuiButton>
  )
}
Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.object,
}
export default Button
