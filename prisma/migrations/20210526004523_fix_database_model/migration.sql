/*
  Warnings:

  - You are about to drop the column `registerDate` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "applicantsData" JSONB,
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "registerDate",
ADD COLUMN     "applyDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Applicant" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
