/*
  Warnings:

  - The values [WFH] on the enum `LeaveType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `emergencyLeave` on the `leaves` table. All the data in the column will be lost.
  - You are about to drop the column `isHalfDay` on the `leaves` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('FULL', 'FIRST_HALF', 'SECOND_HALF');

-- AlterEnum
BEGIN;
CREATE TYPE "LeaveType_new" AS ENUM ('SICK', 'CASUAL', 'LOP');
ALTER TABLE "leave_policies" ALTER COLUMN "leaveType" TYPE "LeaveType_new" USING ("leaveType"::text::"LeaveType_new");
ALTER TABLE "leaves" ALTER COLUMN "leaveType" TYPE "LeaveType_new" USING ("leaveType"::text::"LeaveType_new");
ALTER TYPE "LeaveType" RENAME TO "LeaveType_old";
ALTER TYPE "LeaveType_new" RENAME TO "LeaveType";
DROP TYPE "LeaveType_old";
COMMIT;

-- AlterTable
ALTER TABLE "leaves" DROP COLUMN "emergencyLeave",
DROP COLUMN "isHalfDay",
ADD COLUMN     "endDayType" "DayType" NOT NULL DEFAULT 'FULL',
ADD COLUMN     "startDayType" "DayType" NOT NULL DEFAULT 'FULL';
