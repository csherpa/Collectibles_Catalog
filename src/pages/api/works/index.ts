import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { title, categoryId, description, year, creator, rating, imageUrl } =
      req.body;
    try {
      const work = await prisma.work.create({
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
      return res.status(201).json({ work });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating work' });
    }
  } else if (req.method === 'GET') {
    try {
      const works = await prisma.work.findMany();
      res.status(200).json(works);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching works' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
