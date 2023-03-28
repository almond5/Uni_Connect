import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        const {name, members, admin} = JSON.parse(req.body);

        const rsoCreation = await prisma.rSO.create({
            data:{
                name: name,
                members: members,
                admin: admin,
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