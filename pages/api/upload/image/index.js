import app from '@/api/app'
import { imageFile } from '@/api/_src/libs/upload'

// Routes
app.use(imageFile.array('files'))
app.post((req, res) => res.status(200).json({ message: 'File uploaded successfully', result: req.files }))

// Config
export const config = {
  api: {
    bodyParser: false,
  },
}

export default app
