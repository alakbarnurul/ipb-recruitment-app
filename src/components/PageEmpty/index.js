import React, { cloneElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import Container from '@/src/components/Layout/Container'
import NavigationTop from '@/src/components/NavigationTop'
import NavigationBottom from '@/src/components/NavigationBottom'

const useStyles = makeStyles(({ spacing }) => ({
  emptyIcon: {
    fontSize: spacing(8),
    marginBottom: spacing(2),
    color: '#9CA3AF',
  },
  emptyText: {
    color: '#9CA3AF',
  },
}))
const PageEmpty = ({ icon, message, ...props }) => {
  const classes = useStyles()
  return (
    <Box {...props}>
      <Container header={<NavigationTop />} footer={<NavigationBottom />}>
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Box textAlign='center' mt={14}>
            {cloneElement(icon, {
              className: classes.emptyIcon,
            })}
            <Typography className={classes.emptyText} variant='subtitle1'>
              {message}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

PageEmpty.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.string,
}

export default PageEmpty
