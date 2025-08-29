-- AlterTable
ALTER TABLE "leave_balances" ALTER COLUMN "usedDays" SET DEFAULT 0,
ALTER COLUMN "usedDays" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pendingDays" SET DEFAULT 0,
ALTER COLUMN "pendingDays" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "availableDays" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "carryForward" SET DEFAULT 0,
ALTER COLUMN "carryForward" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "leaves" ALTER COLUMN "totalDays" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "leave_day_statuses" (
    "id" TEXT NOT NULL,
    "leaveId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,

    CONSTRAINT "leave_day_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leave_day_statuses_leaveId_date_key" ON "leave_day_statuses"("leaveId", "date");

-- AddForeignKey
ALTER TABLE "leave_day_statuses" ADD CONSTRAINT "leave_day_statuses_leaveId_fkey" FOREIGN KEY ("leaveId") REFERENCES "leaves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
