import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const getMySession = async () => {
  return getServerSession(authOptions);
};
