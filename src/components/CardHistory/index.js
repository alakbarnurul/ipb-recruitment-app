import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box, CardActions, Button, Card } from '@material-ui/core'
import { Notifications } from '@material-ui/icons'
import Chip from '@/components/Chip'
import PropTypes from 'prop-types'
import ChipProgress from '@/components/ChipProgress'
import DialogDetailHistory from '@/src/components/DialogDetailHistory'

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
  const [isShowDialog, setIsShowDialog] = useState(false)
  const handleIsShowDialog = () => setIsShowDialog(true)
  return (
    <Card className={classes.root} {...props}>
      <Box>
        <Box display='flex' alignItems='center'>
          <Typography className={classes.historyTitle} variant='subtitle1'>
            {campaign?.name}
          </Typography>
          {status.step > 0 && status.step < campaign?.timeline.length - 1 && status.result === 'Accepted' ? (
            <Chip model='onProgress' label='On Progress' />
          ) : (
            <Chip model={status?.result} label={status?.result} />
          )}
        </Box>
        <Box mt={1}>
          <Typography variant='subtitle1'>{organization?.name}</Typography>
          <Typography variant='body2'>Tanggal Pendaftaran : {applyDate}</Typography>
        </Box>
        <Box mt={2} display='flex' alignItems='center'>
          <Notifications className={classes.historyMessageIcon} />
          <Box>
            <Typography variant='subtitle2'>Pesan dari Organizer</Typography>
            <Typography variant='body1'>{status.message}</Typography>
          </Box>
        </Box>
        <Box mt={2} display='flex' alignItems='center' flexWrap='wrap'>
          {positions?.map(position => (
            <Chip className={classes.historyPosition} model='default' key={position} label={position} />
          ))}
        </Box>
        <Box mt={4}>
          <Typography variant='subtitle2'>Hasil Tahapan Seleksi</Typography>
          <Box display='flex' alignItems='center' mt={1}>
            {campaign.timeline.map((step, index) => {
              if (index === campaign.timeline.length - 1) return null
              if (status?.history[index]?.result === 'Accepted') {
                return <ChipProgress model='accepted' key={step.date} />
              } else if (status?.history[index]?.result === 'Rejected') {
                return <ChipProgress model='rejected' key={step.date} />
              } else {
                return <ChipProgress model='default' key={step.date} />
              }
            })}
          </Box>
        </Box>
      </Box>
      <CardActions className={classes.historyActions}>
        <Button type='button' onClick={handleIsShowDialog} className={classes.historyButtonActions}>
          <Typography variant='subtitle2'>Detail</Typography>
        </Button>
      </CardActions>
      {isShowDialog && <DialogDetailHistory isOpen={isShowDialog} setIsOpen={setIsShowDialog} content={historyData} />}
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
