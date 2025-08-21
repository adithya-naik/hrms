/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `holidays` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaveType]` on the table `leave_policies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "holidays_name_key" ON "holidays"("name");

-- CreateIndex
CREATE UNIQUE INDEX "leave_policies_leaveType_key" ON "leave_policies"("leaveType");
