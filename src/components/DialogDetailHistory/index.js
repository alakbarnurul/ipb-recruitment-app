import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Box from '@material-ui/core/Box'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import Chip from '@/components/Chip'
import { Bookmark } from '@material-ui/icons'

const useStyles = makeStyles(({ spacing }) => ({
  iconTitle: {
    fontSize: 26,
  },
  dialogTitle: {
    paddingLeft: spacing(1),
  },
  historyStatus: {
    marginRight: spacing(2),
  },
}))
const DialogDetailHistory = ({ isOpen, setIsOpen, content }) => {
  const classes = useStyles()
  const { campaign, organization, status } = content
  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='md'
        fullWidth={true}
      >
        <Box display='flex' alignItems='center' pt={1} px={3}>
          <Bookmark className={classes.iconTitle} />
          <DialogTitle className={classes.dialogTitle} id='alert-dialog-title'>
            {campaign?.name}
          </DialogTitle>
        </Box>
        <DialogContent>
          <Box>
            <Typography variant='subtitle2'>{organization?.name}</Typography>
            <Typography variant='body1'>Kabinet - {organization?.cabinet}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant='subtitle2'>Timeline</Typography>
            <Timeline align='alternate'>
              {campaign?.timeline?.map((date, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color='primary' />
                    {index + 1 < campaign?.timeline.length && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography variant='body1'>{date?.label}</Typography>
                      <Typography variant='subtitle2'>{date?.date}</Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          <Box my={3} display='flex' alignItems='center'>
            <Typography className={classes.historyStatus} variant='subtitle2'>
              Hasil Akhir :
            </Typography>
            {status.step > 0 && status.step < campaign?.timeline.length - 1 && status.result === 'Accepted' ? (
              <Chip model='onProgress' label='On Progress' />
            ) : (
              <Chip model={status?.result} label={status?.result} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

DialogDetailHistory.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  content: PropTypes.object,
}
DialogDetailHistory.defaultProps = {
  isOpen: false,
}

export default DialogDetailHistory
