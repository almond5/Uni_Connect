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
      });

      let newMember = await prisma.member.deleteMany({
        where: { rsoId: rsoId, userId: user?.id! },
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
