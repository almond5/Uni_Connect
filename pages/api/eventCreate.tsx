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
        addr,
        uniSelected,
        rsoSelected,
        approved,
        userEmail
      } = JSON.parse(req.body);

      const dateForDb = new Date(date);
      let eventCreation = undefined;

      const eventLocCheck = await prisma.eventLocation.findFirst({
        where: {
          addr: addr,
        },
      });

      if (eventLocCheck !== null && eventLocCheck !== undefined) {
        const eventCheck = await prisma.event.findFirst({
          where: {
            id: eventLocCheck?.eventId!,
          },
        });

        const returnData = {
          message: 'Conflicting Locations!',
          eventLoc: eventLocCheck?.addr,
          eventCheck: eventCheck?.name,
          timeConflict: '',
        }

        res.status(201).json(returnData);
        return;
      }

      const eventTimeCheck = await prisma.event.findFirst({
        where: {
          date: dateForDb.toLocaleString()
        },
      });

      if (eventTimeCheck !== null && eventTimeCheck !== undefined) {
        const returnData = {
          message: 'Conflicting Times!',
          eventLoc: '',
          eventCheck: eventTimeCheck?.name,
          timeConflict: eventTimeCheck?.date,
        }

        res.status(201).json(returnData);
        return;
      }

      if (type === 'RSO_EVENT') {

        const findRSO = await prisma.rSO.findFirst({
          where: {
            id: rsoSelected,
          },
        });

        const findUser = await prisma.user.findFirst({
          where: {
            email: userEmail,
          },
          include : { uni: true }
        });

        if (findRSO?.adminID !== findUser?.id) {
          const returnData = {
            message: 'You are not the admin of this RSO!',
            eventLoc: '',
            eventCheck: '',
            timeConflict: '',
          }
          res.status(201).json(returnData);
          return;
        }
        
        eventCreation = await prisma.event.create({
          data: {
            name: title,
            type: type,
            description: body,
            date: dateForDb.toLocaleString(),
            phone_no: phoneNumber,
            RSO: { connect: { id: findRSO!.id } },
            approved: approved,
            university: { connect: { id: findUser!.uni!.id! } },
          },
        });
      } else if (type === 'PRIVATE') {
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
            approved: approved,
            university: { connect: { id: findUni!.id! } },
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
      }

      let eventLocation = await prisma.eventLocation.create({
        data: {
          addr: addr,
          latitude: lat,
          longitude: lng,
          uniId: uniSelected ? uniSelected : null,
          eventId: eventCreation.id,
        },
      });

      eventCreation = await prisma.event.update({
        where: { id: eventCreation.id },
        data: {
          eventlocation: {
            connect: {
              id: eventLocation.id,
            },
          },
        },
      });

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
    
    const returnData = {
      message: 'SUCCESS',
      eventLoc: '',
      eventCheck: '',
      timeConflict: '',
    }

    res.status(201).json(returnData);
    return
  } else {
    const returnData = {
      message: 'FAILURE',
      eventLoc: '',
      eventCheck: '',
      timeConflict: '',
    }
    res.status(201).json(returnData);
    return
  }
}
