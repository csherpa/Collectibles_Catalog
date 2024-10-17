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
      const work = await prisma.work.findUnique({
        where: { id: Number(id) },
      });
      if (!work) {
        return res.status(404).json({ error: 'Work not found' });
      }
      res.status(200).json(work);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving work' });
    }
  } else if (req.method === 'PUT') {
    const { title, categoryId, description, year, creator, rating, imageUrl } =
      req.body;
    try {
      const work = await prisma.work.update({
        where: { id: Number(id) },
        data: {
          title,
          categoryId,
          description,
          year,
          creator,
          rating,
          imageUrl,
        },
      });
      res.status(200).json(work);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating work' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.work.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting work' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
