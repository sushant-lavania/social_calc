/*
  Warnings:

  - Added the required column `createdBy` to the `Spreadsheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spreadsheet" ADD COLUMN     "createdBy" TEXT NOT NULL;
