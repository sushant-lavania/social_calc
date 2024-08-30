/*
  Warnings:

  - The primary key for the `Cell` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Filter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PivotTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sheet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Spreadsheet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "Config" DROP CONSTRAINT "Config_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "Filter" DROP CONSTRAINT "Filter_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "PivotTable" DROP CONSTRAINT "PivotTable_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_spreadsheetId_fkey";

-- DropForeignKey
ALTER TABLE "Spreadsheet" DROP CONSTRAINT "Spreadsheet_userid_fkey";

-- AlterTable
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sheetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cell_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cell_id_seq";

-- AlterTable
ALTER TABLE "Config" DROP CONSTRAINT "Config_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sheetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Config_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Config_id_seq";

-- AlterTable
ALTER TABLE "Filter" DROP CONSTRAINT "Filter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sheetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Filter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Filter_id_seq";

-- AlterTable
ALTER TABLE "PivotTable" DROP CONSTRAINT "PivotTable_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sheetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PivotTable_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PivotTable_id_seq";

-- AlterTable
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "spreadsheetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sheet_id_seq";

-- AlterTable
ALTER TABLE "Spreadsheet" DROP CONSTRAINT "Spreadsheet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Spreadsheet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Spreadsheet_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Spreadsheet" ADD CONSTRAINT "Spreadsheet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_spreadsheetId_fkey" FOREIGN KEY ("spreadsheetId") REFERENCES "Spreadsheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PivotTable" ADD CONSTRAINT "PivotTable_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filter" ADD CONSTRAINT "Filter_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
