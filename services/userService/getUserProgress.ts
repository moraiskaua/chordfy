import { getSession } from 'next-auth/react';
import { cache } from 'react';

export const getUserProgress = cache(async () => {
  const user = getSession();

  console.log(user);

  // if (user)
});
