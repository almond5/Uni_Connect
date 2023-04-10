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
      const {
        title,
        body,
        type,
        date,
        phoneNumber,
        lat,
        lng,
        locationName,
        uniId,
        rsoId
      } = JSON.parse(req.body);      const dateForDb = new Date(date);

      let eventCreation = null;

      if (type === 'RSO_EVENT'){
        eventCreation = await prisma.eventApproval.create({
          data: {
            name: title,
            type: type,
            description: body,
            date: dateForDb.toLocaleString(),
            phone_no: phoneNumber,
            rSOId: rsoId,
            eventlocation: {
              create: {
                name: locationName,
                latitude: lat,
                longitude: lng,
                uniId: uniId,
              },
            },
          },
        });
      }
      else {
        eventCreation = await prisma.eventApproval.create({
          data: {
            name: title,
            type: type,
            description: body,
            date: dateForDb.toLocaleString(),
            phone_no: phoneNumber,
            eventlocation: {
              create: {
                name: locationName,
                latitude: lat,
                longitude: lng,
                uniId: uniId,
              },
            },
          },
        });
      }


    } catch (error) {
      console.log(error)
    }

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
