import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { challengeId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.challenge.findFirst({
    where: {
      id: params.challengeId,
    },
  });

  return NextResponse.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: { challengeId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();
  const data = await prisma.challenge.update({
    where: {
      id: params.challengeId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(data);
};

export const DELETE = async (
  request: Request,
  {
    params,
  }: {
    params: { challengeId: string };
  },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.challenge.delete({
    where: {
      id: params.challengeId,
    },
  });

  return NextResponse.json(data);
};
