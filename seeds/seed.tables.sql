BEGIN;

TRUNCATE
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'guest',
    'Guest',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );