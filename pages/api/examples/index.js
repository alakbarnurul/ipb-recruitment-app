export default async function exampleHandler(req, res) {
  const data = req.body
  return res.status(200).json({ data })
}
