  CREATE TABLE "article" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL,
  "vote_count" INTEGER DEFAULT NULL, 
  -- "upvote_count" INTEGER DEFAULT NULL, 
  -- "downvote_count" INTEGER DEFAULT NULL,
  "author" TEXT DEFAULT NULL,
  "title" TEXT DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "source_name" TEXT DEFAULT NULL, 
  "url" TEXT DEFAULT NULL,
  "url_to_image" TEXT DEFAULT NULL,
  "publish_at" TIMESTAMP DEFAULT now() NOT NULL,
  "content" TEXT NOT NULL
);

  
  
  
  
  ALTER TABLE "comment"
    ADD COLUMN "article_id" INTEGER REFERENCES "article"(id)
    ON DELETE CASCADE;