/*
  Warnings:

  - Added the required column `tanggal` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "deskripsi" TEXT,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;
