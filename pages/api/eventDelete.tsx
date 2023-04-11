import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = JSON.parse(req.body);

      const eventToDelete = await prisma.event.findFirst({
        where: { id: id },
      });

      const eventDeletion = await prisma.event.delete({
        where: { id: eventToDelete?.id },
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
