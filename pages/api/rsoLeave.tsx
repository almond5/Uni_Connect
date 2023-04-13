import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

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
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
