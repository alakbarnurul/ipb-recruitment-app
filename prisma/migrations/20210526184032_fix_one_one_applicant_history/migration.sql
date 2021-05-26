/*
  Warnings:

  - You are about to drop the column `applicantId` on the `History` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[historyId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_applicantId_fkey";

-- DropIndex
DROP INDEX "History_applicantId_unique";

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "historyId" TEXT;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "applicantId";

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_historyId_unique" ON "Applicant"("historyId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;
