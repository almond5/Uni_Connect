import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, members, admin, body } = JSON.parse(req.body);
      let userArray = [];

      const adminUser = await prisma.user.findFirst({
        where: { email: admin },
        include: { uni: true },
      });

      if (adminUser === null || adminUser === undefined) {
        res.status(201).json('Admin is not registered!');
        return;
      }

      if (!(adminUser === null || adminUser === undefined)) {
        const rso = await prisma.rSO.create({
          data: {
            name: name,
            adminID: adminUser!.id,
            description: body,
            members: {},
            active: 'TRUE',
            uni: { connect: { id: adminUser!.uni!.id } },
          },
        });

        for (var email of members) {
          let user = await prisma.user.findFirst({
            where: { email: email },
            include: { uni: true },
          });

          if (user === null || user === undefined) {

            const deletedRSO = await prisma.rSO.findFirst({
              where: { id: rso.id },
            });

            const delRso = await prisma.rSO.delete({
              where: { id: deletedRSO!.id! },
            });

            res.status(201).json('One of your members is not registered!');
            return;
          }

          userArray.push(user);
        }

        if (userArray.length !== members.length) {
          const delRso = await prisma.rSO.delete({
            where: { id: rso.id },
          });

          res.status(201).json('One of your members is not registered!');
          return;
        }

        for (var user of userArray) {
          if (user!.uni!.id !== adminUser?.universityId) {
            const delRso = await prisma.rSO.delete({
              where: { id: rso.id },
            });

            res
              .status(201)
              .json('One of your members is not from the same university!');
            return;
          }

          if (user!.id! === adminUser?.id) {
            let newMember = await prisma.member.create({
              data: {
                isAdmin: 'TRUE',
                rsoId: rso.id,
                userId: user?.id!,
                approved: 'APPROVED',
                name: user?.name!,
                email: user?.email!,
                uniId: user?.uni!.id!,
                rsoName: rso?.name,
              },
            });
          } else {
            let newMember = await prisma.member.create({
              data: {
                isAdmin: 'NOT_APPROVED',
                rsoId: rso.id,
                userId: user?.id!,
                approved: 'APPROVED',
                name: user?.name!,
                email: user?.email!,
                uniId: user?.uni!.id!,
                rsoName: rso?.name,
              },
            });
          }
        }
        if (
          !(adminUser === null || adminUser === undefined) &&
          adminUser.role === 'STUDENT'
        ) {
          const updateAdminUserRole = await prisma.user.update({
            where: { id: adminUser?.id },
            data: { role: 'ADMIN' },
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
