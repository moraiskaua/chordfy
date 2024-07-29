import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { lessonId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.lesson.findFirst({
    where: {
      id: params.lessonId,
    },
  });

  return NextResponse.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: { lessonId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();
  const data = await prisma.lesson.update({
    where: {
      id: params.lessonId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(data);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { lessonId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.lesson.delete({
    where: {
      id: params.lessonId,
    },
  });

  return NextResponse.json(data);
};
