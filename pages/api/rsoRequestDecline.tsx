import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { memId } = JSON.parse(req.body);
      const member = await prisma.member.delete({ where: { id: memId } });
    } catch (error) {
      console.log(error);
    }
    
    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
