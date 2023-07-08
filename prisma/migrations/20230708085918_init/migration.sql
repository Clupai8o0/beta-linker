-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_id_key" ON "Link"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Link_name_key" ON "Link"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Link_github_url_key" ON "Link"("github_url");

-- CreateIndex
CREATE UNIQUE INDEX "Link_website_url_key" ON "Link"("website_url");

-- CreateIndex
CREATE UNIQUE INDEX "Link_image_url_key" ON "Link"("image_url");
