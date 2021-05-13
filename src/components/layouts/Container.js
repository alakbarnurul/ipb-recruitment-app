import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container as MuiContainer, Paper, Box } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ spacing }) => ({
  rootContainer: {},
  rootPaper: {
    padding: `0 ${spacing(2)}px`,
    minHeight: '100vh',
  },
}))
const Container = ({ children, header, footer, ...props }) => {
  const classes = useStyles()
  return (
    <MuiContainer className={classes.rootContainer} maxWidth='md' disableGutters={true} {...props}>
      <Box>{header}</Box>
      <Paper className={classes.rootPaper} elevation={3}>
        {children}
      </Paper>
      <Box>{footer}</Box>
    </MuiContainer>
  )
}
Container.propTypes = {
  children: PropTypes.array || PropTypes.element,
  header: PropTypes.element,
  footer: PropTypes.element,
}
export default Container
