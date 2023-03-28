import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {body, title} = JSON.parse(req.body);

    try {
      const eventCreation = await prisma.event.create({
        data: {
          name: title,
          // date: newDate,
        },
            });

    } catch (error) {
      
    }

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
