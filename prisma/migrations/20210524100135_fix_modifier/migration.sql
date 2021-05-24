/*
  Warnings:

  - A unique constraint covering the columns `[formUrl]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form.formUrl_unique" ON "Form"("formUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Organization.email_unique" ON "Organization"("email");
