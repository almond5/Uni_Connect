import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';
import { stringify } from 'querystring';
import prisma from '../../lib/prismadb';

const EventType = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  RSO_EVENT: 'RSO_EVENT',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {title, body, type, date} = JSON.parse(req.body);

      console.log("Hi this is event" + type[0]);


      const eventCreation = await prisma.event.create({
        data: {
          name: title,
          type: type,
          description: body,
          date: date
        }
      });

    } catch (error) {
      console.log(error)
    }

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
