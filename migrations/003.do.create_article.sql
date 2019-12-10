  CREATE TABLE "article" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "vote_count" INTEGER DEFAULT 0, 
  "author" TEXT DEFAULT NULL,
  "title" TEXT DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "source_name" TEXT DEFAULT NULL, 
  "url" TEXT DEFAULT NULL,
  "url_to_image" TEXT DEFAULT NULL,
  "publish_at" TIMESTAMP DEFAULT now() NOT NULL,
  "content" TEXT NOT NULL,
  "posted_at" TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY(id)
);

  
  ALTER TABLE "comment"
    ADD COLUMN "article_id" UUID REFERENCES "article"(id)
    ON DELETE CASCADE;