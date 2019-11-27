BEGIN;

TRUNCATE
  "article_vote",
  "article",
  "comment",
  "user";

INSERT INTO "user" (id, username, name, password)
VALUES
  (
    1,
    'guest1',
    'Guest1',
    -- password = 'pass'
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
),
  (
  2,
  'guest2',
  'Guest2',
  -- password = 'pass'
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
),
  (
  3,
  'guest3',
  'Guest3',
  -- password = 'pass'
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
);


INSERT INTO "article" (id, user_id, upvote_count, downvote_count, author, title, description, source_name, url, url_to_image, publish_at, content)
VALUES
(
  1,
  1,
  45,
  23,
  'Chloe Bryan',
  'The cats can have little a salami meme is the best kind of meme',
  'Cats can, famously, have little a salami. But can cats really have little a salami? The meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.',
  'Mashable',
  'https://mashable.com/article/cats-salami-meme/',
  'https://mondrian.mashable.com/2019%252F11%252F18%252F39%252Fa08448b11ca5489b8b2569aaf1a0319e.f2e79.jpg%252F1200x630.jpg?signature=wbmbUhPaj0xwrZ1BxkvpMVENsgY=',
  '2019-11-18T19:31:09Z',
  'Cats can, famously, have little a salami. But can cats really have little a salami? meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.'
),
(
  2,
  2,
  563,
  12,
  'Donald Trump',
  'The cats can have little a salami meme is the best kind of meme',
  'Cats can, famously, have little a salami. But can cats really have little a salami? The meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.',
  'Mashable',
  'https://mashable.com/article/cats-salami-meme/',
  'https://mondrian.mashable.com/2019%252F11%252F18%252F39%252Fa08448b11ca5489b8b2569aaf1a0319e.f2e79.jpg%252F1200x630.jpg?signature=wbmbUhPaj0xwrZ1BxkvpMVENsgY=',
  '2019-11-18T19:31:09Z',
  'Cats can, famously, have little a salami. But can cats really have little a salami? meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.'
),
(
  3,
  2,
  45,
  523,
  'Ashley Hansen',
  'The cats can have little a salami meme is the best kind of meme',
  'Cats can, famously, have little a salami. But can cats really have little a salami? The meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.',
  'Mashable',
  'https://mashable.com/article/cats-salami-meme/',
  'https://mondrian.mashable.com/2019%252F11%252F18%252F39%252Fa08448b11ca5489b8b2569aaf1a0319e.f2e79.jpg%252F1200x630.jpg?signature=wbmbUhPaj0xwrZ1BxkvpMVENsgY=',
  '2019-11-18T19:31:09Z',
  'Cats can, famously, have little a salami. But can cats really have little a salami? meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.'
),
(
  4,
  3,
  145,
  145,
  'Shawn Collette',
  'The cats can have little a salami meme is the best kind of meme',
  'Cats can, famously, have little a salami. But can cats really have little a salami? The meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.',
  'Mashable',
  'https://mashable.com/article/cats-salami-meme/',
  'https://mondrian.mashable.com',
  '2019-11-18T19:31:09Z',
  'Cats can, famously, have little a salami. But can cats really have little a salami? meme is the best kind of meme: a single sentence applied to every possible post like a gorgeous, nonsensical chorus.'
);


INSERT INTO "comment" (id, user_id, comment, date_commented, article_id)
VALUES
  (
    1,
    1,
    'This article is weird',
    '2019-09-30 22:59:37',
    1
),
  (
    2,
    1,
    'This article is weak',
    '2019-09-30 22:59:37',
    2
),
  (
    3,
    2,
    'This article is sad',
    '2019-09-30 22:59:37',
    3
),
  (
    4,
    3,
    'This article is awesome',
    '2019-09-30 22:59:37',
    3
);

INSERT INTO "article_vote" (id, vote_type, user_id, article_id)
VALUES 
(
  1,
  'up',
  1,
  3
),
(
  2,
  'down',
  2,
  2
),
(
  3,
  'up',
  1,
  3
),
(
  4,
  'down',
  3,
  1
);

SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('article_id_seq', (SELECT MAX(id) from "article"));
SELECT setval('comment_id_seq', (SELECT MAX(id) from "comment"));
SELECT setval('article_vote_id_seq', (SELECT MAX(id) from "article_vote"));

COMMIT;