/*
  Warnings:

  - You are about to drop the column `drive_file_url` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `profile_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "profile_url" TEXT;

-- AlterTable
ALTER TABLE "Drive" DROP COLUMN "drive_file_url",
ADD COLUMN     "eligible_current_arrears" INTEGER,
ADD COLUMN     "eligible_history_of_arrears" INTEGER,
ADD COLUMN     "job_type" TEXT,
ADD COLUMN     "mode" TEXT,
ADD COLUMN     "required_skills" TEXT[],
ADD COLUMN     "venue" TEXT;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "profile_url" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "profile_url" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_url";
