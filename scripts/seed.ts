import prisma from '@/database/db';

const main = async () => {
  try {
    console.log('Seeding database...');

    await prisma.course.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.unit.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.challenge.deleteMany();
    await prisma.challengeOption.deleteMany();
    await prisma.challengeProgress.deleteMany();

    await prisma.course.createMany({
      data: [
        {
          id: '0c8a85d7-7480-4bbf-a1f4-3dfcbfb942c1',
          title: 'Intervals',
          image: '/piano.svg',
        },
        {
          id: '4ee7f732-95f5-449e-add5-b4041122d68c',
          title: 'Chord Quality',
          image: '/piano.svg',
        },
      ],
    });

    await prisma.unit.createMany({
      data: [
        {
          id: '54af6639-98a5-412c-a32d-1cc3832ac147',
          courseId: '0c8a85d7-7480-4bbf-a1f4-3dfcbfb942c1',
          title: 'Module 1',
          description: 'Learn the basics',
          order: 0,
        },
        {
          id: 'b72e49b9-cae3-4c81-848e-3d9b4db49adb',
          courseId: '0c8a85d7-7480-4bbf-a1f4-3dfcbfb942c1',
          title: 'Module 2',
          description: 'Another step',
          order: 1,
        },
      ],
    });

    await prisma.lesson.createMany({
      data: [
        {
          id: 'a4ee7045-37d2-4893-a014-6301daa255e0',
          unitId: '54af6639-98a5-412c-a32d-1cc3832ac147',
          title: 'Third',
          order: 0,
        },
        {
          id: '0c733e03-a7db-43f7-b0ef-f7003028576c',
          unitId: '54af6639-98a5-412c-a32d-1cc3832ac147',
          title: 'Fifth',
          order: 1,
        },
        {
          id: '5942151d-82f9-4e14-87b6-107397f32f91',
          unitId: '54af6639-98a5-412c-a32d-1cc3832ac147',
          title: 'Seventh',
          order: 2,
        },
        {
          id: '7239e544-3c07-492e-8f2a-d5dc49e65911',
          unitId: '54af6639-98a5-412c-a32d-1cc3832ac147',
          title: 'Nineth',
          order: 3,
        },
      ],
    });

    await prisma.challenge.create({
      data: {
        id: 'd8a772de-f7b4-4b32-9e19-e9b57c5eaec2',
        lessonId: 'a4ee7045-37d2-4893-a014-6301daa255e0',
        type: 'SELECT',
        order: 0,
        question: 'which note represents the major third of C?',
      },
    });

    await prisma.challengeOption.createMany({
      data: [
        {
          id: 'e8ec4528-c3e9-40a1-8af4-6a70c5ed2fa8',
          challengeId: 'd8a772de-f7b4-4b32-9e19-e9b57c5eaec2',
          image: '/E.svg',
          text: 'E',
          correct: true,
          audio: '/piano/E.mp3',
        },
        {
          id: '89f56536-7fa4-42d8-95b0-6de9e644440d',
          challengeId: 'd8a772de-f7b4-4b32-9e19-e9b57c5eaec2',
          image: '/F.svg',
          text: 'F',
          correct: false,
          audio: '/piano/F.mp3',
        },
      ],
    });

    console.log('Seeding finished');
  } catch {
    throw new Error('Failed to seed the database');
  }
};

main();
