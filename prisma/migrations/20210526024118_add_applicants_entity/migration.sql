/*
  Warnings:

  - You are about to drop the column `applicantsData` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `campaignId` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `campaignName` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `createdData` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Applicant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_organizationId_fkey";

-- DropIndex
DROP INDEX "Applicant_campaignId_unique";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "applicantsData",
DROP COLUMN "campaignId",
DROP COLUMN "campaignName",
DROP COLUMN "createdData",
DROP COLUMN "organizationId",
ADD COLUMN     "campaignManagerId" TEXT;

-- CreateTable
CREATE TABLE "CampaignManager" (
    "id" TEXT NOT NULL,
    "campaignName" TEXT,
    "createdData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT,
    "organizationId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CampaignManager_campaignId_unique" ON "CampaignManager"("campaignId");

-- AddForeignKey
ALTER TABLE "CampaignManager" ADD FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignManager" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD FOREIGN KEY ("campaignManagerId") REFERENCES "CampaignManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
