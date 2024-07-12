/*
  Warnings:

  - You are about to drop the column `messageId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `attachments` table. All the data in the column will be lost.
  - The primary key for the `members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `messages` table. All the data in the column will be lost.
  - The primary key for the `unread_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `unread_messages` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `unread_messages` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `unread_messages` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `unread_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `unread_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `unread_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_messageId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_chatId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_userId_fkey";

-- DropForeignKey
ALTER TABLE "unread_messages" DROP CONSTRAINT "unread_messages_chatId_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "messageId",
DROP COLUMN "type",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message_id" INTEGER,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "members" DROP CONSTRAINT "members_pkey",
DROP COLUMN "chatId",
DROP COLUMN "userId",
ADD COLUMN     "chat_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "members_pkey" PRIMARY KEY ("chat_id", "user_id");

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "chatId",
DROP COLUMN "userId",
ADD COLUMN     "chat_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "unread_messages" DROP CONSTRAINT "unread_messages_pkey",
DROP COLUMN "chatId",
DROP COLUMN "messageId",
DROP COLUMN "userId",
ADD COLUMN     "chat_id" INTEGER NOT NULL,
ADD COLUMN     "message_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "unread_messages_pkey" PRIMARY KEY ("user_id", "chat_id", "message_id");

-- DropEnum
DROP TYPE "AttachmentType";

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unread_messages" ADD CONSTRAINT "unread_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
