-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'organization');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "imageUrl" TEXT,
    "gender" BOOLEAN,
    "nim" TEXT NOT NULL,
    "yearOfCollege" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRole" "Role" NOT NULL DEFAULT E'student',
    "birthDate" TIMESTAMP(3),
    "faculty" TEXT,
    "department" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "status" JSONB,
    "registerDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT,
    "campaignId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "status" BOOLEAN,
    "imageUrl" TEXT,
    "positions" JSONB,
    "description" TEXT,
    "timeline" JSONB,
    "generalRequirement" TEXT,
    "dateClosed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "fields" JSONB,
    "formUrl" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "userRole" "Role" NOT NULL DEFAULT E'organization',
    "period" TEXT,
    "startPeriod" TIMESTAMP(3),
    "endPeriod" TIMESTAMP(3),
    "cabinet" TEXT,
    "faculty" TEXT,
    "department" TEXT,
    "bio" TEXT,
    "contactPerson" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CampaignToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student.nim_unique" ON "Student"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Student.email_unique" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Form_campaignId_unique" ON "Form"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_campaignId_unique" ON "Applicant"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToStudent_AB_unique" ON "_CampaignToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToStudent_B_index" ON "_CampaignToStudent"("B");

-- AddForeignKey
ALTER TABLE "History" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToStudent" ADD FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToStudent" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
