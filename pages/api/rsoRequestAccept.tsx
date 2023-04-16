import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { memId } = JSON.parse(req.body);

      const member = await prisma.member.updateMany({
        where: { id: memId },
        data: {
          approved: 'APPROVED',
        },
      });

      const memberInfo = await prisma.member.findFirst({
        where: { id: memId },
      });

      const rso = await prisma.rSO.findFirst({
        where: { id: memberInfo?.rsoId },
        include: { members: true },
      });

      let nummems = 0;
      for (let i = 0; i < rso?.members!.length!; i++)
        if (rso?.members![i].approved === 'APPROVED') nummems++;

      if (nummems >= 5 && rso?.active === 'FALSE') {
        let rsoUpdate = await prisma.rSO.update({
          where: { id: rso?.id },
          data: { active: 'TRUE' },
        });

        res.status(201).json('This RSO has been activated.');
      }
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
