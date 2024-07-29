'use server';

import { absoluteUrl } from '@/src/helpers/absoluteUrl';
import { getMySession } from '@/src/helpers/getMySession';
import { stripe } from '@/src/lib/stripe';
import { userService } from '@/src/services/userService';

const returnUrl = absoluteUrl('/shop');

export const createStripeUrl = async () => {
  const session = await getMySession();

  if (!session?.user.id || !session?.user) throw new Error('Unauthorized!');

  const userSubscription = await userService.getSubscription();

  if (userSubscription && userSubscription.stripe_customer_id) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripe_customer_id,
      return_url: returnUrl,
    });

    return {
      data: stripeSession.url,
    };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: session.user.email!,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'BRL',
          product_data: {
            name: 'Chordfy Pro',
            description: 'Unlimited Hearts',
          },
          unit_amount: 890,
          recurring: {
            interval: 'month',
          },
        },
      },
    ],
    metadata: {
      userId: session.user.id,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return {
    data: stripeSession.url,
  };
};
