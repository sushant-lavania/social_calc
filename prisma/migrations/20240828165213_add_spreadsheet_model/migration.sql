/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Spreadsheet" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spreadsheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sheet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spreadsheetId" INTEGER NOT NULL,
    "color" TEXT,
    "status" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "rowCount" INTEGER NOT NULL,
    "columnCount" INTEGER NOT NULL,
    "defaultRowHeight" INTEGER NOT NULL,
    "defaultColWidth" INTEGER NOT NULL,
    "showGridLines" BOOLEAN NOT NULL DEFAULT true,
    "zoomRatio" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cell" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "content" TEXT,
    "sheetId" INTEGER NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "sheetId" INTEGER NOT NULL,
    "rowlen" JSONB NOT NULL,
    "columnlen" JSONB NOT NULL,
    "rowhidden" JSONB NOT NULL,
    "colhidden" JSONB NOT NULL,
    "merge" JSONB NOT NULL,
    "borderInfo" JSONB NOT NULL,
    "authority" JSONB NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PivotTable" (
    "id" SERIAL NOT NULL,
    "sheetId" INTEGER NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "PivotTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" SERIAL NOT NULL,
    "sheetId" INTEGER NOT NULL,
    "filter_select" JSONB NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cell_sheetId_key" ON "Cell"("sheetId");

-- CreateIndex
CREATE UNIQUE INDEX "Config_sheetId_key" ON "Config"("sheetId");

-- CreateIndex
CREATE UNIQUE INDEX "PivotTable_sheetId_key" ON "PivotTable"("sheetId");

-- CreateIndex
CREATE UNIQUE INDEX "Filter_sheetId_key" ON "Filter"("sheetId");

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
