  CREATE TABLE "article_vote" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" UUID REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL,
  "article_id" UUID REFERENCES "article"(id)
    ON DELETE CASCADE NOT NULL,
  "vote_type" BOOLEAN DEFAULT NULL,
  PRIMARY KEY(id)
);