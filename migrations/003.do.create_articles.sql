  CREATE TABLE "article" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL,
  "upvote_count" INTEGER DEFAULT NULL, 
  "downvote_count" INTEGER DEFAULT NULL,
  "author" TEXT DEFAULT NULL,
  "title" TEXT DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "sourceName" TEXT DEFAULT NULL, 
  "url" VARCHAR(2048) DEFAULT NULL,
  "urlToImage" TEXT DEFAULT NULL,
  "publishAt" TIMESTAMP DEFAULT now() NOT NULL,
  "content" TEXT NOT NULL
);

  
  
  
  
  ALTER TABLE "comment"
    ADD COLUMN "article_id" INTEGER REFERENCES "article"(id)
    ON DELETE CASCADE NOT NULL;