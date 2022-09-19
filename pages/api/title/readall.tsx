import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getAllTitles = async(req: NextApiRequest, res: NextApiResponse) => {
  const titles = await prisma.title.findMany();
  return res.status(200).send({message: "success", titles: titles})
}

export default getAllTitles