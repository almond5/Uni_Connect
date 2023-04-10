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
      } = JSON.parse(req.body);
      const dateForDb = new Date(date);

      let eventCreation = undefined;
      
      if (type === 'RSO_EVENT'){
        eventCreation = await prisma.event.create({
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
        eventCreation = await prisma.event.create({
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

      const feedback = await prisma.feedback.create({
        data: {
          eventId: eventCreation.id,
        },
      });

      const event = await prisma.event.update({
        where: { id: eventCreation.id },
        data: { feedbackId: feedback.id },
      })
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
