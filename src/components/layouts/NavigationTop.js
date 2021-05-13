import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@material-ui/core'
import clsx from 'clsx'

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

export default function DenseAppBar() {
  const classes = useStyles()
  const isMaxWidth = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const isMinWidth = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  if (!isMaxWidth && !isMinWidth) return null
  return (
    <Box className={clsx(classes.root)}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.maxWidth]: isMaxWidth,
          [classes.minWidth]: isMinWidth,
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
