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

      const newComment = await prisma.feedback.create({
        data: {
          eventId: event.eventId
          // event: {
          //   connect
          // }
        }
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
