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
      const { title, body, num_students, lat, lng, addr, phoneNumber } = JSON.parse(req.body);

      const uniCreation = await prisma.university.create({
        data: {
          name: title,
          num_students: num_students,
          description: body,
          phone_no: phoneNumber,
          location: {
            create: {
              latitude: lat,
              longitude: lng,
              name: addr,
            }
          }
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
