import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function exampleHandler(req, res) {
  const { id } = req.body
  const data = await prisma.organization.findMany({
    where: {
      id: id,
    },
    include: {
      campaigns: true,
    },
  })
  return res.status(200).json({ data })
}
