-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_messageId_fkey";

-- AlterTable
ALTER TABLE "attachments" ALTER COLUMN "messageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
