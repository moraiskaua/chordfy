import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { courseId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.course.findFirst({
    where: {
      id: params.courseId,
    },
  });

  return NextResponse.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: { courseId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();
  const data = await prisma.course.update({
    where: {
      id: params.courseId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(data);
};

export const DELETE = async ({ params }: { params: { courseId: string } }) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.course.delete({
    where: {
      id: params.courseId,
    },
  });

  return NextResponse.json(data);
};
