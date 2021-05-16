import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core'
import clsx from 'clsx'
import useBreakpoints from '@/hooks/useBreakpoints'

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed',
  },
  menuButton: {
    marginRight: spacing(2),
  },
  maxWidth: {
    width: breakpoints.values.md,
  },
  minWidth: {
    width: '100%',
  },
}))

const NavigationTop = (props) => {
  const classes = useStyles()
  const { isUp, isDown } = useBreakpoints()
  return (
    <Box className={clsx(classes.root)} {...props}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.maxWidth]: isUp,
          [classes.minWidth]: isDown,
        })}
        position='static'
      >
        <Toolbar variant='regular'>
          <Typography variant='h2' color='inherit'>
            IPB Recruitment
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationTop
