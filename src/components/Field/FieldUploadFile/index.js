import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ spacing, palette }) => ({
  smDropzone: {
    minHeight: 10,
  },
  icon: {
    display: 'none',
  },
  previewChip: {
    marginTop: spacing(2),
  },
  text: {
    fontSize: 16,
  },
  label: {
    marginBottom: spacing(2),
  },
  errorText: {
    color: palette.error.main,
    marginTop: spacing(1),
  },
}))
const FieldUploadFile = props => {
  const { name, label, formikProps, filesLimit, ...rest } = props
  const { setFieldValue, errors } = formikProps
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.label} variant='body1' align='left'>
        {label}
      </Typography>
      <DropzoneArea
        onChange={files => setFieldValue(name, files)}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewText={''}
        filesLimit={filesLimit}
        acceptedFiles={['application/*']}
        maxFileSize={10000000}
        previewGridProps={{
          container: {
            spacing: 1,
            direction: 'row',
          },
        }}
        previewChipProps={{
          classes: { root: classes.previewChip },
        }}
        classes={{
          root: classes.smDropzone,
          icon: classes.icon,
          text: classes.text,
        }}
        {...rest}
      />
      {!!errors[name] && (
        <Typography className={classes.errorText} variant='body2' align='left'>
          {errors[name]}
        </Typography>
      )}
    </Box>
  )
}
FieldUploadFile.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  formikProps: PropTypes.object,
  filesLimit: PropTypes.number,
}
export default FieldUploadFile
