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
        uniSelected,
        rsoSelected,
        approved,
      } = JSON.parse(req.body);
      const dateForDb = new Date(date);
      let eventCreation = undefined;

      if (type === 'RSO_EVENT') {
        const findRSO = await prisma.rSO.findFirst({
          where: {
            id: rsoSelected,
          },
        });

        const findUni = await prisma.university.findFirst({
          where: {
            id: uniSelected,
          },
        });

        eventCreation = await prisma.event.create({
          data: {
            name: title,
            type: type,
            description: body,
            date: dateForDb.toLocaleString(),
            phone_no: phoneNumber,
            RSO: { connect: { id: findRSO!.id } },
            approved: approved,
          },
        });

        let eventLocation = await prisma.eventLocation.create({
          data: {
            name: locationName,
            latitude: lat,
            longitude: lng,
            uniId: uniSelected,
            eventId: eventCreation.id,
          },
        });
      } else {
        eventCreation = await prisma.event.create({
          data: {
            name: title,
            type: type,
            description: body,
            date: dateForDb.toLocaleString(),
            phone_no: phoneNumber,
            approved: approved,
          },
        });

        let eventLocation = await prisma.eventLocation.create({
          data: {
            name: locationName,
            latitude: lat,
            longitude: lng,
            uniId: uniSelected,
            eventId: eventCreation.id,
          },
        });
      }

      const feedbackCreate = await prisma.feedback.create({
        data: { eventId: eventCreation.id },
      });

      const eventUpdate = await prisma.event.update({
        where: { id: eventCreation.id },
        data: { feedbackId: feedbackCreate.id },
      });
      
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
