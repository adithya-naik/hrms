/*
  Warnings:

  - The values [VACATION,ACADEMIC,COMP_OFF] on the enum `LeaveType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `leavePolicyId` to the `leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeaveType_new" AS ENUM ('SICK', 'CASUAL', 'WFH', 'LOP');
ALTER TABLE "leave_policies" ALTER COLUMN "leaveType" TYPE "LeaveType_new" USING ("leaveType"::text::"LeaveType_new");
ALTER TABLE "leaves" ALTER COLUMN "leaveType" TYPE "LeaveType_new" USING ("leaveType"::text::"LeaveType_new");
ALTER TYPE "LeaveType" RENAME TO "LeaveType_old";
ALTER TYPE "LeaveType_new" RENAME TO "LeaveType";
DROP TYPE "LeaveType_old";
COMMIT;

-- AlterTable
ALTER TABLE "leaves" ADD COLUMN     "isLOP" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "leavePolicyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_leavePolicyId_fkey" FOREIGN KEY ("leavePolicyId") REFERENCES "leave_policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
