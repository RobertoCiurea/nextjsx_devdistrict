/*
  Warnings:

  - Added the required column `condition` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "condition" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
