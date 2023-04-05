import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, event, body } = JSON.parse(req.body);
      const feedbackId = event.name + new Date().toUTCString();

      const findEvent = await prisma.event.findUnique({
        where: { id: event.id },
        include: { feedback: true },
      });

      const feedback = await prisma.feedback.update({
        where: { eventId: findEvent?.id },
        data: {
          comments: {
            create: {
              comment: body,
              user: { connect: { email: email } },
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
