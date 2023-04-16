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
      const { title, body, lat, lng, addr, phoneNumber } = JSON.parse(req.body);

      const uniCreation = await prisma.university.create({
        data: {
          name: title,
          description: body,
          num_students: 0,
          phone_no: phoneNumber,
          location: {
            create: {
              latitude: lat,
              longitude: lng,
              name: addr,
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
