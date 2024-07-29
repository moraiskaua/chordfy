import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/database/db';
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userAlreadyExists) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
};
