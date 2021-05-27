import multer from 'multer'
import { v1 as uuidv1 } from 'uuid'

const destination = './public/cloud/files'
// Notes : Size in bytes
const sizeFileLimit = 10000000
const documentFile = multer({
  limits: {
    fileSize: sizeFileLimit,
  },
  storage: multer.diskStorage({
    destination,
    filename: (_, file, callback) => {
      const uniqueFilenames = `${uuidv1()}-${file.originalname}`
      return callback(null, uniqueFilenames)
    },
  }),
  fileFilter: (_, file, callback) => {
    if (['application/pdf'].includes(file.mimetype)) {
      return callback(null, true)
    }
    return callback(new Error('Please only upload image types (*.doc, *.docx, or *.pdf)'))
  },
})

export default documentFile
