import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = JSON.parse(req.body);
      const approved = 'TRUE';

      const eventApproved = await prisma.event.findFirst({
        where: { id: id },
      });

      const updateEvent = await prisma.event.update({
        where: { id: eventApproved?.id! },
        data: { approved: approved },
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
