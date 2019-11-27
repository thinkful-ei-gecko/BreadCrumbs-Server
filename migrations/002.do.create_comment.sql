CREATE TABLE "comment" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"(id) 
    ON DELETE CASCADE NOT NULL,
  "comment" TEXT NOT NULL,
  "date_commented" TIMESTAMP DEFAULT now() NOT NULL
);

