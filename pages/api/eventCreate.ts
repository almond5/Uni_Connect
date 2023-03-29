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
      const { title, body, type, date, phoneNumber, lat, lng, locationName, uniId } = JSON.parse(req.body);
      const dateForDb = new Date(date);
      const eventID = lat + lng + title

      const eventCreation = await prisma.event.create({
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
              eventId: eventID
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
