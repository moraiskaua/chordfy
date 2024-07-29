import prisma from '@/src/database/db';
import { getIsAdmin } from '@/src/helpers/isAdmin';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const data = await prisma.unit.findMany();

  return NextResponse.json(data);
};

export const POST = async (request: Request) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse('Unauthorized!', { status: 401 });

  const body = await request.json();

  const data = await prisma.unit.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(data);
};
