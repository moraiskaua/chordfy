import { env } from '@/src/constants/env';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_API_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});
