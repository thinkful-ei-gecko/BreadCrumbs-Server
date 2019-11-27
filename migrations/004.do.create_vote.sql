  CREATE TABLE "article_vote" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL,
  "article_id" INTEGER REFERENCES "article"(id)
    ON DELETE CASCADE NOT NULL,
  "vote_type" TEXT DEFAULT NULL
);