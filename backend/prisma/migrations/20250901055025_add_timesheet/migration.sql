/*
  Warnings:

  - The values [APPROVED,REJECTED] on the enum `TimesheetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimesheetStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'IN_PROGRESS');
ALTER TABLE "Timesheet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Timesheet" ALTER COLUMN "status" TYPE "TimesheetStatus_new" USING ("status"::text::"TimesheetStatus_new");
ALTER TYPE "TimesheetStatus" RENAME TO "TimesheetStatus_old";
ALTER TYPE "TimesheetStatus_new" RENAME TO "TimesheetStatus";
DROP TYPE "TimesheetStatus_old";
ALTER TABLE "Timesheet" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
