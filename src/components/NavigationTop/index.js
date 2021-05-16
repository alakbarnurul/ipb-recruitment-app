import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core'
import clsx from 'clsx'
import { useStoreBreakpoints } from '@/src/stores/main'
import shallow from 'zustand/shallow'

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
  const [isViewDownMd, isViewUpMd] = useStoreBreakpoints((state) => [state.isViewDownMd, state.isViewUpMd], shallow)
  return (
    <Box className={clsx(classes.root)} {...props}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.maxWidth]: isViewUpMd,
          [classes.minWidth]: isViewDownMd,
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
