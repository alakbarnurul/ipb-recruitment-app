import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box, CardActions, Button, Card } from '@material-ui/core'
import { Notifications } from '@material-ui/icons'
import Chip from '@/components/Chip'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    textAlign: 'left',
    padding: spacing(2),
    marginBottom: spacing(1),
  },
  historyTitle: {
    marginRight: spacing(3),
  },
  historyActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  historyButtonActions: {
    marginRight: spacing(2),
  },
  historyMessageIcon: {
    marginRight: spacing(2),
  },
  historyPosition: {
    marginRight: spacing(1),
    marginTop: spacing(1),
  },
}))

const CardHistory = ({ historyData, ...props }) => {
  const classes = useStyles()
  const { positions, applyDate, status, campaign, organization } = historyData
  return (
    <Card className={classes.root} {...props}>
      <Box>
        <Box display='flex' alignItems='center'>
          <Typography className={classes.historyTitle} variant='subtitle1'>
            {campaign?.name}
          </Typography>
          <Chip model={status?.result} label={status?.result} />
        </Box>
        <Box mt={1}>
          <Typography variant='body1'>
            {organization?.name} - Kabinet {organization?.cabinet}
          </Typography>
          <Typography variant='body2'>{applyDate}</Typography>
        </Box>
        <Box mt={2} display='flex' alignItems='center'>
          <Notifications className={classes.historyMessageIcon} />
          <Typography variant='body1'>{status.message}</Typography>
        </Box>
        <Box mt={2} display='flex' alignItems='center' flexWrap='wrap'>
          {positions?.map(position => (
            <Chip className={classes.historyPosition} model='default' key={position} label={position} />
          ))}
        </Box>
      </Box>
      <CardActions className={classes.historyActions}>
        <Button className={classes.historyButtonActions}>
          {/* <Link href={`/home/campaign/${id}`} passHref> */}
          <Typography variant='subtitle2'>Detail</Typography>
          {/* </Link> */}
        </Button>
      </CardActions>
    </Card>
  )
}
CardHistory.propTypes = {
  historyData: PropTypes.object,
  positions: PropTypes.array,
  applyDate: PropTypes.string,
  status: PropTypes.object,
  campaign: PropTypes.object,
}

export default CardHistory
