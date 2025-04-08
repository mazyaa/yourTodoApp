/*
  Warnings:

  - You are about to drop the column `categoryId` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_categoryId_fkey";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "categories";
