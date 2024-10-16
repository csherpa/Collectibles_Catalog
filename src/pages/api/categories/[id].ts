/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/categories/[id].ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name } = req.body;
    try {
      const category = await prisma.category.update({
        where: { id: parseInt(id as string) },
        data: { name },
      });
      return res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: 'Error updating category' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.category.delete({
        where: { id: parseInt(id as string) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting category' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
