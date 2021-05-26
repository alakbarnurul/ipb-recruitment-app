import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import Button from '@/src/components/Button'
import EventIcon from '@material-ui/icons/Event'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Chip from '@/components/Chip'

const useStyles = makeStyles(({ spacing }) => ({
  campaignRoot: {
    maxWidth: 345,
  },
  campaignBanner: {
    height: 200,
  },
  campaignTitle: {
    marginRight: spacing(3),
  },
  campaignChip: {
    fontSize: 14,
    fontWeight: 800,
  },
  campaignOrganization: {
    fontSize: 16,
  },
  campaignDescription: {
    maxHeight: spacing(14),
    overflow: 'scroll',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'word',
  },
  campaignActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  campaignButtonDetail: {
    marginRight: spacing(2),
  },
  campaignDateClosed: {
    fontSize: 14,
    margin: `${spacing(2)}px ${spacing(1.5)}px`,
  },
}))

const CardCampaign = ({ campaignContent, ...props }) => {
  const { id, imageUrl, title, status, Organization, dateClosed, description } = campaignContent
  const classes = useStyles()
  return (
    <Card className={classes.campaignRoot} {...props}>
      <CardMedia
        className={classes.campaignBanner}
        image={imageUrl ?? '/images/pictures/picture-default.png'}
        title='Contemplative Reptile'
      />
      <CardContent>
        <Box mb={1} display='flex' alignItems='center'>
          <Typography className={classes.campaignTitle} variant='h5' component='h2'>
            {title}
          </Typography>
          {status ? <Chip model='accepted' label='Open' /> : <Chip model='rejected' label='Closed' />}
        </Box>
        <Typography className={classes.campaignOrganization} gutterBottom variant='subtitle1' component='h2'>
          {Organization?.name}
        </Typography>
        <Box display='flex' alignItems='center'>
          <EventIcon />
          <Typography className={classes.campaignDateClosed} variant='subtitle1' component='h2'>
            Date Closed :
          </Typography>
          <Typography>{dateClosed}</Typography>
        </Box>
        <Typography className={classes.campaignDescription} variant='body1' color='textSecondary' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.campaignActions}>
        <Button className={classes.campaignButtonDetail}>
          <Link href={`/home/campaign/${id}`} passHref>
            <Typography variant='subtitle2'>Apply</Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}
CardCampaign.propTypes = {
  campaignContent: PropTypes.object,
}
export default CardCampaign
