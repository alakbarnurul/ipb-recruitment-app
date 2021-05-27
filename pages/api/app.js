import NextConnect from 'next-connect'

const app = NextConnect({
  onError(error, req, res) {
    res.status(501).json({ message: error.message })
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method '${req.method}' Not Allowed` })
  },
})

export default app
