/*
  Warnings:

  - A unique constraint covering the columns `[applicantId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "applicantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "History_applicantId_unique" ON "History"("applicantId");

-- AddForeignKey
ALTER TABLE "History" ADD FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
