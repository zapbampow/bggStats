/*
  Warnings:

  - You are about to drop the column `user_id` on the `BggStatsUsageHistory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BggStatsUsageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BggStatsUsageHistory" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    CONSTRAINT "BggStatsUsageHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BggUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BggStatsUsageHistory" ("createdAt", "id", "page") SELECT "createdAt", "id", "page" FROM "BggStatsUsageHistory";
DROP TABLE "BggStatsUsageHistory";
ALTER TABLE "new_BggStatsUsageHistory" RENAME TO "BggStatsUsageHistory";
CREATE UNIQUE INDEX "BggStatsUsageHistory_id_key" ON "BggStatsUsageHistory"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
