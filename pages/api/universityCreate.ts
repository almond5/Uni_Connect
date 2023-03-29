import { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';
import { stringify } from 'querystring';
import prisma from '../../lib/prismadb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {title, body, num_students } = JSON.parse(req.body);
      const uniId = title.slice(0,4) + title.length 

      const uniCreation = await prisma.university.create({
        data: {
          name: title,
          uniId: uniId,
          num_students: num_students,
          description: body,
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
