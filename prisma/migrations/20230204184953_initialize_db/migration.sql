-- CreateTable
CREATE TABLE "BggUser" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BggStatsUsageHistory" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    CONSTRAINT "BggStatsUsageHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "BggUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BggUser_id_key" ON "BggUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BggUser_username_key" ON "BggUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "BggStatsUsageHistory_id_key" ON "BggStatsUsageHistory"("id");
