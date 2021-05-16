import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import useBreakpoints from '@/hooks/useBreakpoints'

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid #D1D5DB',
    zIndex: 99,
  },
  maxWidth: {
    width: breakpoints.values.md,
  },
  minWidth: {
    width: '100%',
  },
}))

const NavigationBottom = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const pathName = router.asPath.split('/')[1]
  const [value, setValue] = useState(pathName)
  const { isUp, isDown } = useBreakpoints()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <BottomNavigation
      className={clsx(classes.root, {
        [classes.maxWidth]: isUp,
        [classes.minWidth]: isDown,
      })}
      value={value}
      showLabels
      onChange={handleChange}
      {...props}
    >
      <BottomNavigationAction onClick={() => router.replace('/history')} label='History' value='history' icon={<RestoreIcon />} />
      <BottomNavigationAction onClick={() => router.replace('/home')} label='Home' value='home' icon={<HomeIcon />} />
      <BottomNavigationAction
        onClick={() => router.replace('/profile')}
        label='Profile'
        value='profile'
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  )
}

export default NavigationBottom
