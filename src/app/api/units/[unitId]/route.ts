import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { unitId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.unit.findFirst({
    where: {
      id: params.unitId,
    },
  });

  return NextResponse.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: { unitId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();
  const data = await prisma.unit.update({
    where: {
      id: params.unitId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(data);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { unitId: string } },
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.unit.delete({
    where: {
      id: params.unitId,
    },
  });

  return NextResponse.json(data);
};
