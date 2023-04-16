import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const ucfLoc = await prisma.location.create({
    data: { name: '4000 Central Florida Blvd, Orlando, FL 32816', latitude: 28.6024, longitude: 81.2001 },
  });
  const usfLoc = await prisma.location.create({
    data: { name: '4202 E Fowler Ave, Tampa, FL 33620', latitude: 28.0587, longitude: 82.4139 },
  });

  const ucf = await prisma.university.create({
    data: {
      name: 'University of Central Florida',
      description: 'University located in Orlando, FL',
      num_students: 66183,
      phone_no: '4078232000',
      locationId: ucfLoc.id,
    },
  });
  
  const usf = await prisma.university.create({
    data: {
      name: 'University of South Florida',
      description: 'University located in Tampa, FL',
      num_students: 49591,
      phone_no: '8139741222',
      locationId: usfLoc.id,
    },
  });

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'SA@email.com',
      password: 'superadmin',
      role: 'SUPERADMIN',
    },
  });

  const admin1 = await prisma.user.create({
    data: {
      name: 'Harry Potter',
      email: 'harry@email.com',
      password: 'harry',
      role: 'ADMIN',
      universityId: ucf.id,
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: 'Ron Weasley',
      email: 'ron@email.com',
      password: 'ron',
      role: 'ADMIN',
      universityId: ucf.id,
    },
  });

  const admin3 = await prisma.user.create({
    data: {
      name: 'Hermione Granger',
      email: 'hermione@email.com',
      password: 'hermione',
      role: 'ADMIN',
      universityId: usf.id,
    },
  });

  const harryrso = await prisma.rSO.create({
    data: {
      name: 'Team Harry',
      adminID: admin1.id,
      uniId: ucf.id,
      active: 'TRUE',
    },
  });

  const ronrso = await prisma.rSO.create({
    data: {
      name: 'Team Ron',
      adminID: admin2.id,
      uniId: ucf.id,
      active: 'TRUE',
    },
  });

  const hermionerso = await prisma.rSO.create({
    data: {
      name: 'Team Hermione',
      adminID: admin3.id,
      uniId: usf.id,
      active: 'TRUE',
    },
  });

  const demo1 = await prisma.user.create({
    data: {
      name: 'Andrea',
      email: 'demo1@email.com',
      password: 'demopassword1',
      universityId: ucf.id,
    },
  });

  const demo2 = await prisma.user.create({
    data: {
      name: 'Adrian',
      email: 'demo2@email.com',
      password: 'demopassword2',
      universityId: ucf.id,
    },
  });

  const demo3 = await prisma.user.create({
    data: {
      name: 'Sebastian',
      email: 'demo3@email.com',
      password: 'demopassword3',
      universityId: ucf.id,
    },
  });

  const demo4 = await prisma.user.create({
    data: {
      name: 'David',
      email: 'demo4@email.com',
      password: 'demopassword4',
      universityId: ucf.id,
    },
  });

  const demo5 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'demo5@email.com',
      password: 'demopassword5',
      universityId: ucf.id,
    },
  });

  const demo6 = await prisma.user.create({
    data: {
      name: 'John',
      email: 'demo6@email.com',
      password: 'demopassword6',
      universityId: ucf.id,
    },
  });

  const demo7 = await prisma.user.create({
    data: {
      name: 'Jane',
      email: 'demo7@email.com',
      password: 'demopassword7',
      universityId: ucf.id,
    },
  });

  const demo8 = await prisma.user.create({
    data: {
      name: 'Joe',
      email: 'demo8@email.com',
      password: 'demopassword8',
      universityId: ucf.id,
    },
  });

  const demo9 = await prisma.user.create({
    data: {
      name: 'SpongeBob',
      email: 'demo9@email.com',
      password: 'demopassword9',
      universityId: ucf.id,
    },
  });

  const demo10 = await prisma.user.create({
    data: {
      name: 'Patrick',
      email: 'demo10@email.com',
      password: 'demopassword10',
      universityId: ucf.id,
    },
  });

  const demo11 = await prisma.user.create({
    data: {
      name: 'Squidward',
      email: 'demo11@email.com',
      password: 'demopassword11',
      universityId: usf.id,
    },
  });

  const demo12 = await prisma.user.create({
    data: {
      name: 'Sandy',
      email: 'demo12@email.com',
      password: 'demopassword12',
      universityId: usf.id,
    },
  });

  const demo13 = await prisma.user.create({
    data: {
      name: 'Mr. Krabs',
      email: 'demo13@email.com',
      password: 'demopassword13',
      universityId: usf.id,
    },
  });

  const demo14 = await prisma.user.create({
    data: {
      name: 'Pearl',
      email: 'demo14@email.com',
      password: 'demopassword14',
      universityId: usf.id,
    },
  });

  const demo15 = await prisma.user.create({
    data: {
      name: 'Plankton',
      email: 'demo15@email.com',
      password: 'demopassword15',
      universityId: usf.id,
    },
  });

  const demo16 = await prisma.user.create({
    data: {
      name: 'Karen',
      email: 'demo16@email.com',
      password: 'demopassword16',
      universityId: ucf.id,
    },
  });

  const demo17 = await prisma.user.create({
    data: {
      name: 'Gary',
      email: 'demo17@email.com',
      password: 'demopassword17',
      universityId: ucf.id,
    },
  });
  
  const demo18 = await prisma.user.create({
    data: {
      name: 'Mrs. Puff',
      email: 'demo18@email.com',
      password: 'demopassword18',
      universityId: ucf.id,
    },
  });

  const demo19 = await prisma.user.create({
    data: {
      name: 'Larry',
      email: 'demo19@email.com',
      password: 'demopassword19',
      universityId: ucf.id,
    },
  });

  const demo20 = await prisma.user.create({
    data: {
      name: 'Flats',
      email: 'demo20@email.com',
      password: 'demopassword20',
      universityId: ucf.id,
    },
  });

  await prisma.member.createMany({
    data: [
      {
        rsoId: harryrso.id,
        userId: admin1.id,
        rsoName: harryrso.name,
        name: admin1.name!,
        email: admin1.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'TRUE',
      },
      {
        rsoId: harryrso.id,
        userId: demo1.id,
        rsoName: harryrso.name,
        name: demo1.name!,
        email: demo1.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: harryrso.id,
        userId: demo2.id,
        rsoName: harryrso.name,
        name: demo2.name!,
        email: demo2.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: harryrso.id,
        userId: demo3.id,
        rsoName: harryrso.name,
        name: demo3.name!,
        email: demo3.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: harryrso.id,
        userId: demo4.id,
        rsoName: harryrso.name,
        name: demo4.name!,
        email: demo4.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: harryrso.id,
        userId: demo5.id,
        rsoName: harryrso.name,
        name: demo5.name!,
        email: demo5.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: ronrso.id,
        userId: admin2.id,
        rsoName: ronrso.name,
        name: admin2.name!,
        email: admin2.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'TRUE',
      },
      {
        rsoId: ronrso.id,
        userId: demo6.id,
        rsoName: ronrso.name,
        name: demo6.name!,
        email: demo6.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: ronrso.id,
        userId: demo7.id,
        rsoName: ronrso.name,
        name: demo7.name!,
        email: demo7.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: ronrso.id,
        userId: demo8.id,
        rsoName: ronrso.name,
        name: demo8.name!,
        email: demo8.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: ronrso.id,
        userId: demo9.id,
        rsoName: ronrso.name,
        name: demo9.name!,
        email: demo9.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: ronrso.id,
        userId: demo10.id,
        rsoName: ronrso.name,
        name: demo10.name!,
        email: demo10.email,
        uniId: ucf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: hermionerso.id,
        userId: admin3.id,
        rsoName: hermionerso.name,
        name: admin3.name!,
        email: admin3.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'TRUE',
      },
      {
        rsoId: hermionerso.id,
        userId: demo11.id,
        rsoName: hermionerso.name,
        name: demo11.name!,
        email: demo11.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: hermionerso.id,
        userId: demo12.id,
        rsoName: hermionerso.name,
        name: demo12.name!,
        email: demo12.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: hermionerso.id,
        userId: demo13.id,
        rsoName: hermionerso.name,
        name: demo13.name!,
        email: demo13.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: hermionerso.id,
        userId: demo14.id,
        rsoName: hermionerso.name,
        name: demo14.name!,
        email: demo14.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
      {
        rsoId: hermionerso.id,
        userId: demo15.id,
        rsoName: hermionerso.name,
        name: demo15.name!,
        email: demo15.email,
        uniId: usf.id,
        approved: 'APPROVED',
        isAdmin: 'FALSE',
      },
    ],
  });

  const harrymeeting = await prisma.event.create({
    data: {
      name: 'Team Harry Meeting!',
      description: 'First meeting of the Team Harry RSO group',
      date: '4/22/2023, 8:00:00 AM',
      phone_no: '1234567890',
      email: 'harryrsoemail@knights.ucf.edu',
      type: 'RSO_EVENT',
      rSOId: harryrso.id,
      universityId: ucf.id,
      approved: 'TRUE',
    },
  });
  
  const plantsale = await prisma.event.create({
    data: {
      name: 'Plant Sale',
      description: 'Arboretum plant sale, open to everyone!',
      date: '4/22/2023, 4:00:00 PM',
      phone_no: '1234567890',
      email: 'plantsale@knights.ucf.edu',
      type: 'PUBLIC',
      universityId: ucf.id,
      approved: 'TRUE',
    },
  });

  const fitnessclass = await prisma.event.create({
    data: {
      name: 'Fitness Class',
      description: 'Group Workout event at the USF Rec center. Students only.',
      date: '4/23/2023, 4:00:00 PM',
      phone_no: '1234567890',
      email: 'usfreccenter@usf.edu',
      type: 'PRIVATE',
      universityId: usf.id,
      approved: 'TRUE',
    },
  });

  const arboretum = await prisma.eventLocation.create({
    data: {
      addr: '4312 Scorpius St, Orlando, FL 32816',
      latitude: 28.6018286,
      longitude: -81.1991501,
      uniId: ucf.id,
      eventId: plantsale.id,
      Event: { connect: { id: plantsale.id } },
    },
  });

  const eng2 = await prisma.eventLocation.create({
    data: {
      addr: '12760 Pegasus Dr, Orlando, FL 32816',
      latitude: 28.6017838,
      longitude: -81.201102,
      uniId: ucf.id,
      eventId: harrymeeting.id,
      Event: { connect: { id: harrymeeting.id } },
    },
  });

  const usfRec = await prisma.eventLocation.create({
    data: {
      addr: '12301 USF Genshaft Dr, Tampa, FL 33620',
      latitude: 28.060257,
      longitude: -82.4096803,
      uniId: usf.id,
      eventId: fitnessclass.id,
      Event: { connect: { id: fitnessclass.id } },
    },
  });

  const harryfb = await prisma.feedback.create({
    data: { eventId: harrymeeting.id },
  });

  const plantfb = await prisma.feedback.create({
    data: { eventId: plantsale.id },
  });

  const fitnessfb = await prisma.feedback.create({
    data: { eventId: fitnessclass.id },
  });

  await prisma.comment.createMany({
    data: [
      {
        comment: 'Super Excited for the plant sale!!!',
        author: demo1.name!,
        email: demo1.email,
        feedbackId: plantfb.id,
        userId: demo1.id,
      },
      {
        comment: "Let's go team Harry!",
        author: demo3.name!,
        email: demo3.email,
        feedbackId: harryfb.id,
        userId: demo3.id,
      },
      {
        comment: 'I hate fitness',
        author: demo15.name!,
        email: demo15.email,
        feedbackId: fitnessfb.id,
        userId: demo15.id,
      },
    ],
  });

  await prisma.event.update({
    where: { id: harrymeeting.id },
    data: {
      feedbackId: harryfb.id,
    },
  });

  await prisma.event.update({
    where: { id: plantsale.id },
    data: {
      feedbackId: plantfb.id,
    },
  });

  await prisma.event.update({
    where: { id: fitnessclass.id },
    data: {
      feedbackId: fitnessfb.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
