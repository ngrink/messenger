/*
  Warnings:

  - Added the required column `type` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "type" TEXT NOT NULL;
