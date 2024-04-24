-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "birthdate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL;
