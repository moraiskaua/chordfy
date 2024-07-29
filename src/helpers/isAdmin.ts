import { env } from '../constants/env';
import { getMySession } from './getMySession';

export const getIsAdmin = async () => {
  const allowedIds = [env.OWNER_ID, env.SUBOWNER_ID];
  const session = await getMySession();

  if (!session?.user.id) return false;

  return allowedIds.indexOf(session?.user.id) !== -1;
};
