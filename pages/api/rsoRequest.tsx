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
        include: { uni: true },
      });

      const rso = await prisma.rSO.findFirst({ where: { id: rsoId } });
      const approval = await prisma.member.create({
        data: {
          approved: 'PENDING',
          isAdmin: 'FALSE',
          userId: user?.id!,
          uniId: user?.uni!.id!,
          rsoId: rso?.id!,
          name: user?.name!,
          email: user?.email!,
          rsoName: rso?.name!,
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
