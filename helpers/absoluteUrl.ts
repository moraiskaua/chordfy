import { env } from '@/constants/env';

export const absoluteUrl = (path: string) => env.NEXT_PUBLIC_APP_URL + path;
