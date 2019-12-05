CREATE TABLE "bake" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" UUID REFERENCES "user"(id) 
    ON DELETE CASCADE NOT NULL,
  "article_id" UUID REFERENCES "article"(id)
    ON DELETE CASCADE NOT NULL,
  "date_baked" TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY(id)
);

