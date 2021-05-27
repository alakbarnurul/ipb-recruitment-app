import multer from 'multer'
import { v1 as uuidv1 } from 'uuid'

const destination = './public/cloud/images'
// Notes : Size in bytes
const sizeFileLimit = 1000000
const imageFile = multer({
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
    if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.mimetype)) {
      return callback(null, true)
    }
    return callback(new Error('Please only upload image types (*.jpeg, *.png, or *.svg)'))
  },
})

export default imageFile
