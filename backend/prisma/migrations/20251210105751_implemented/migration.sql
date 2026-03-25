/*
  Warnings:

  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `rawData` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('UPI', 'NEFT', 'IMPS', 'RTGS', 'ATM', 'CASH', 'CARD', 'CHEQUE', 'WALLET', 'BANK_TRANSFER', 'UNKNOWN');

-- DropIndex
DROP INDEX "Transaction_categoryId_idx";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentMode" "PaymentMode" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "balanceAfterTxn" DROP NOT NULL,
ALTER COLUMN "rawData" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_userId_date_idx" ON "Transaction"("userId", "date");

-- CreateIndex
CREATE INDEX "Transaction_paymentMode_idx" ON "Transaction"("paymentMode");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
