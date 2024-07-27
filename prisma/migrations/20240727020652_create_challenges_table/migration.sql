-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('SELECT', 'ASSIST');

-- CreateTable
CREATE TABLE "challenges" (
    "id" UUID NOT NULL,
    "lessonId" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "ChallengeType" NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_options" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "audio" TEXT NOT NULL,

    CONSTRAINT "challenge_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_options" ADD CONSTRAINT "challenge_options_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
