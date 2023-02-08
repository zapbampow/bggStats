-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BggStatsUsageHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    CONSTRAINT "BggStatsUsageHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BggUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BggStatsUsageHistory" ("createdAt", "id", "page", "userId") SELECT "createdAt", "id", "page", "userId" FROM "BggStatsUsageHistory";
DROP TABLE "BggStatsUsageHistory";
ALTER TABLE "new_BggStatsUsageHistory" RENAME TO "BggStatsUsageHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
