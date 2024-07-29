import { env } from '@/src/constants/env';
import prisma from '@/src/database/db';
import { stripe } from '@/src/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const POST = async (request: NextRequest) => {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.userId) {
      return new NextResponse('userId is required', { status: 400 });
    }

    await prisma.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await prisma.userSubscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
};
