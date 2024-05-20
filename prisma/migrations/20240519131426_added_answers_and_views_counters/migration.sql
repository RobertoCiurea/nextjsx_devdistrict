-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answersCounter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewsCounter" INTEGER NOT NULL DEFAULT 0;
