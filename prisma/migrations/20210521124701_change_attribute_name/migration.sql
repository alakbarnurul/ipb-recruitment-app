/*
  Warnings:

  - You are about to drop the column `userRole` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `userRole` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "userRole",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'organization';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "userRole",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'student';
