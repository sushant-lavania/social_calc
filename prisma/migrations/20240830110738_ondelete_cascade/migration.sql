-- DropForeignKey
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_spreadsheetId_fkey";

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_spreadsheetId_fkey" FOREIGN KEY ("spreadsheetId") REFERENCES "Spreadsheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
