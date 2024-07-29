import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { challendOptionId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.challengeOption.findFirst({
    where: {
      id: params.challendOptionId,
    },
  });

  return NextResponse.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: { challendOptionId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();
  const data = await prisma.challengeOption.update({
    where: {
      id: params.challendOptionId,
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
    params: { challendOptionId: string };
  },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.challengeOption.delete({
    where: {
      id: params.challendOptionId,
    },
  });

  return NextResponse.json(data);
};
