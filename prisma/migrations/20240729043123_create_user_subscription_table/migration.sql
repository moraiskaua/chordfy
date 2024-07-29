-- CreateTable
CREATE TABLE "user_subscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT NOT NULL,
    "stripe_price_id" TEXT NOT NULL,
    "stripe_current_period_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_subscription_stripe_customer_id_key" ON "user_subscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscription_stripe_subscription_id_key" ON "user_subscription"("stripe_subscription_id");
