/*
  Warnings:

  - The primary key for the `users_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users_progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_progress" DROP CONSTRAINT "users_progress_pkey",
DROP COLUMN "id",
ALTER COLUMN "user_name" SET DEFAULT 'User',
ALTER COLUMN "user_image" SET DEFAULT '',
ADD CONSTRAINT "users_progress_pkey" PRIMARY KEY ("userId");
