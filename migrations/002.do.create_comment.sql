CREATE TABLE "comment" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" UUID REFERENCES "user"(id) 
    ON DELETE CASCADE NOT NULL,
  "vote_count" INTEGER DEFAULT NULL,
  "date_commented" TIMESTAMP DEFAULT now() NOT NULL,
  "comment" TEXT NOT NULL,
  PRIMARY KEY(id)
);

