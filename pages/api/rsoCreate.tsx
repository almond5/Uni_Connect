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
        include: { uni: true }
      });

      if ((!(adminUser === null || adminUser === undefined)) && adminUser.role === 'STUDENT') {
        const updateAdminUserRole = await prisma.user.update({
          where: { id: adminUser?.id },
          data: {
            role: 'ADMIN',
          },
        });
      }

      if (!(adminUser === null || adminUser === undefined)) {
        const rso = await prisma.rSO.create({
          data: {
            name: name,
            adminID: adminUser!.id,
            members: {},
            uni: {
              connect: { id: adminUser!.uni!.id },
            }
          },
        });

        for (var email of members) {
          let user = await prisma.user.findFirst({
            where: {
              email: email,
            },
            include: { uni: true }
          });

          userArray.push(user);
        }

        if (userArray.length !== members.length) {
          const delRso = prisma.rSO.delete({
            where: { id: rso.id },
          });
        }

        for (var user of userArray) {
          if (user!.uni!.id !== adminUser?.universityId) {
            const delRso = prisma.rSO.delete({
              where: { id: rso.id },
            });
          }

          let newMember = await prisma.member.create({
            data: {
              rsoId: rso.id,
              userId: user?.id!,
            },
          });
        }
      }

    } catch (error) {
      console.log(error);
    }

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
