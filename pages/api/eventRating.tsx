import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, event, ratingVal } = JSON.parse(req.body);

      const findEvent = await prisma.event.findUnique({
        where: { id: event.id },
        include: { feedback: true },
      });

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      const feedback = await prisma.feedback.update({
        where: { eventId: findEvent?.id },
        data: {
          ratings: {
            create: {
              rating: Number(ratingVal!),
              user: { connect: { id: user!.id } }
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}