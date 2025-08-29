/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hrId" TEXT;

-- DropTable
DROP TABLE "Setting";

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "logoUrl" TEXT,
    "address" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "timezone" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "dateFormat" TEXT NOT NULL,
    "timeFormat" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hrId_fkey" FOREIGN KEY ("hrId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
