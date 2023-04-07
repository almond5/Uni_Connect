import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';
import error from 'next/error';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, members, admin } = JSON.parse(req.body);
      let userArray = [];

      const adminUser = await prisma.user.findFirst({
        where: {
          email: admin,
        },
      });

      if (adminUser === null || adminUser === undefined) return;

      if (adminUser?.role !== 'SUPERADMIN' && adminUser?.role !== 'ADMIN') {
        const updateAdminUserRole = await prisma.user.update({
          where: { id: adminUser?.id },
          data: {
            role: 'ADMIN',
          },
        });
      }

      const rso = await prisma.rSO.create({
        data: {
          name: name,
          adminID: adminUser!.id,
          members: {},
        },
      });

      for (var email of members) {
        let user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        userArray.push(user);
      }
      if (userArray.length !== members.length) {
        const delRso = prisma.rSO.delete({
          where: { id: rso.id },
        });
        return;
      }

      for (var user of userArray) {
        if (user?.universityId !== adminUser?.universityId) {
          const delRso = prisma.rSO.delete({
            where: { id: rso.id },
          });
          return;
        }
        let newMember = await prisma.member.create({
          data: {
            rsoId: rso.id,
            userId: user?.id!,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
