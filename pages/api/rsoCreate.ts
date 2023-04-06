import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';
import { useState } from 'react';
import { Member } from '@prisma/client';

//const [memObjs, setMemObjs] = useState<any>([]);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        const {name, members, admin} = JSON.parse(req.body);
        const rsoId = name + members

        const memberCreation = async (memId: any) =>{
          let newMem  = await prisma.member.create({
            data:{
              rsoId: rsoId,
              userId: memId
            }
          })
          console.log(newMem)
          console.log(typeof newMem)
          return <Member>newMem
        }

        let newMemArr = members.map((mem: any) => memberCreation(mem));
        console.log(newMemArr)

        const rsoCreation = await prisma.rSO.create({
            data:{
                rsoId: rsoId,
                name: name,
                members: newMemArr,
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