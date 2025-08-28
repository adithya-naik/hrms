/*
  Warnings:

  - A unique constraint covering the columns `[userId,leavePolicyId,year,month]` on the table `leave_balances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `leave_balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetDate` to the `leave_balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyQuota` to the `leave_policies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "leave_balances_userId_leavePolicyId_year_key";

-- AlterTable
ALTER TABLE "leave_balances" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "resetDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "leave_policies" ADD COLUMN     "monthlyQuota" INTEGER NOT NULL,
ADD COLUMN     "quotaResetDay" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "leave_balances_userId_leavePolicyId_year_month_key" ON "leave_balances"("userId", "leavePolicyId", "year", "month");
