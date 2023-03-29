import { NextApiRequest, NextApiResponse } from 'next';
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
      const { id } = JSON.parse(req.body);

      const deleteApproval = await prisma.eventApproval.delete({
        where: {
          id: id
        }
      })


    } catch (error) {
      console.log(error)
    }

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
