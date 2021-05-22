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
const Container = ({ children, header, headerY, footer, footerY, ...props }) => {
  const classes = useStyles()
  return (
    <MuiContainer className={classes.rootContainer} maxWidth='md' disableGutters={true} {...props}>
      <Box>{header}</Box>
      <Paper className={classes.rootPaper} elevation={3}>
        {/* Notes : Element Box dgn props headerY dan footerY untuk menghindari bug karena header dan foooter yang fixed position */}
        <Box py={headerY} />
        {children}
        <Box py={footerY} />
      </Paper>
      <Box>{footer}</Box>
    </MuiContainer>
  )
}
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  header: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  headerY: PropTypes.number,
  footerY: PropTypes.number,
}
Container.defaultProps = {
  headerY: 5,
  footerY: 5,
}
export default Container
