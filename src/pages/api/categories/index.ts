/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name } = req.body;
    try {
      const category = await prisma.category.create({ data: { name } });
      console.log({ category });
      return res.status(201).json({ category });
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  } else if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  }
}
