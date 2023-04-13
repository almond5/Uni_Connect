import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

prisma.$use(async (params, next) => {
  const result = await next(params);
  console.log(params);
  return result;
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { rsoId, userEmail } = JSON.parse(req.body);

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
        include: { Member: true },
      });

      let member = await prisma.member.findMany({
        where: {
          rsoId: rsoId,
          userId: user?.id!,
        },
      });

      if (member[0].isAdmin === 'TRUE') {
        member = await prisma.member.findMany({
          where: { rsoId: rsoId },
        });

        for (let i = 1; i < member.length!; i++) {
          if (member[i].userId !== member[0].userId) {
            let newAdmin = await prisma.member.update({
              where: { id: member[i].id },
              data: { isAdmin: 'TRUE' },
            });
          }
        }
      }

      const delMember = await prisma.member.delete({
        where: { id: member[0].id },
      });

      const rso = await prisma.rSO.findFirst({ where: { id: rsoId }, include: { members: true }});

      let nummems = 0;
      for (let i = 0; i < rso?.members!.length!; i++)
        if (rso?.members![i].approved === 'APPROVED') 
          nummems++;

      if (nummems < 5) {
        let rsoUpdate = await prisma.rSO.update({
          where: { id: rso?.id },
          data: { active: 'FALSE' },
        });

        res.status(201).json('This RSO has been deactivated.');
        return;
      }

    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}