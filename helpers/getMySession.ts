import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getMySession = async () => {
  return getServerSession(authOptions);
};
