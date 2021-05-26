export default async function updateFormHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { id } = req.query
  return res.status(200).json({ id, message: 'Untuk update form' })
}
