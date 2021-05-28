import app from '@/api/app'
import { imageFile } from '@/api/_src/libs/upload'
import verificationToken from '@/api/_src/utils/verificationToken'
import prisma from '@/api/_src/libs/prisma'

// Routes
app.use(imageFile.array('images'))
app.post(async (req, res) => {
  // Notes : Get the image path
  const imageLocalPath = req.files[0].path.slice(6)
  // Notes : Store new photo path to database
  const authToken = req.headers['authorization']
  const { data, status } = verificationToken(authToken)
  if (!status) {
    throw new Error('User not found')
  }
  const currentUser = await prisma.student.update({
    where: {
      id: data.user.id,
    },
    data: {
      imageUrl: imageLocalPath,
    },
  })
  return res.status(200).json({ message: 'Image uploaded successfully', currentUser })
})

// Config
export const config = {
  api: {
    bodyParser: false,
  },
}

export default app
