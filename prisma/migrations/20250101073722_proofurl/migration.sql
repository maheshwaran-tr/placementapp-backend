/*
  Warnings:

  - You are about to drop the column `profile_pic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "proof_url" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_pic",
ADD COLUMN     "profile_url" TEXT;
