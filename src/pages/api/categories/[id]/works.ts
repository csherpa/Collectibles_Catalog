import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const works = await prisma.work.findMany({
        where: {
          categoryId: Number(id),
        },
      });

      if (works.length === 0) {
        return res
          .status(404)
          .json({ error: 'No works found for this category' });
      }

      res.status(200).json(works);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving works' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
