import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { userEmail, password, uniSelected, fName, lName } = JSON.parse(
        req.body
      );

      const findIfExist = await prisma.user.findFirst({
        where: { email: userEmail },
      });

      if (findIfExist !== null && findIfExist !== undefined) {
        res.status(201).json('User already exists!');
        return
      }

      const name = fName + ' ' + lName;
      const uni = await prisma.university.findFirst({
        where: { id: uniSelected },
      });
      const user = await prisma.user.create({
        data: {
          name: name,
          email: userEmail,
          password: password,
          uni: { connect: { id: uni?.id } },
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
