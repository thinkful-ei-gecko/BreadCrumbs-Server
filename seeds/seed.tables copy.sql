BEGIN;

TRUNCATE
  "article_vote",
  "comment_vote",
  "save",
  "bake",
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

-- INSERT INTO "article" (id, user_id, upvote_count, downvote_count, author, title, description, source_name, url, url_to_image, publish_at, content)
INSERT INTO "article" (id, user_id, vote_count, author, title, description, source_name, url, url_to_image, publish_at, content)
VALUES
(
  1,
  1,
  45,
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
  'Andrew Tarantola',
  'How tech can improve everyday life for the elderly',
  'Thanks to steady advances in modern medicine, humans are living longer than ever, but whats the point of passing that centennial mark if you cant enjoy your platinum years? Just because your body doesnt work as well as it did when you were 20 and practical…',
  'Mashable',
  'https://www.engadget.com/2019/11/07/best-accessibility-tech-for-the-elderly/',
  'https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fresize%3D2000%252C2000%252Cshrink%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-10%252Ff9abaae0-fb0b-11e9-be07-97715d703324%26client%3Da1acac3e1b3290917d92%26signature%3D895e2abb142f1021cb87ebea65792e8480b097df&client=amp-blogside-v2&signature=bf37765c461e6d29de768d9819b89ea74eb716e4',
  '2019-11-07T14:00:00Z',
  'Mobility: Youre never too old to get back into shape. Exercise offers folks of all ages a slew of physical, emotional and mental health benefits. Now, that doesnt mean you need to be hitting the gym like Schwarzenegger (though if you can, more power to you)… '
),
(
  3,
  2,
  45,
  'David Murphy',
  'How Can I Keep an Old All-In-One PC Running Quickly and Efficiently?',
  'Im always thrilled to get help me out with a tech problem letters in my inbox, and I’ve had quite a few lately related to PC upkeep—likely prompted by this Tech 911 question I answered last month. Im back with another one today, and it’s a twist on the ol…',
  'Lifehacker',
  'https://lifehacker.com/how-can-i-keep-an-old-all-in-one-pc-running-fast-and-ef-1839699455',
  'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/sfxtcxohcnuuo4y2q6l9.jpg',
  '2019-11-08T14:00:00Z',
  'Im always thrilled to get help me out with a tech problem letters in my inbox, and Ive had quite a few lately related to PC upkeeplikely prompted by this Tech 911 question I answered last month. Im back with another one today, and its a twist on the ol How do…'
),
(
  4,
  3,
  145,
  'Andrew Williams',
  'Report: The Government and Tech Need to Cooperate on AI',
  'It also warns that AI-enhanced national security apparatus like autonomous weapons and surveillance systems will raise ethical questions.',
  'Wired',
  'https://www.wired.com/story/report-government-and-tech-need-cooperate-ai/',
  'https://media.wired.com/photos/5dc0903041c1680009813bd9/191:100/w_1280,c_limit/Biz-Schmidt-h_15275095.jpg',
  '2019-11-05T12:00:00Z',
  'Americas national security depends on the government getting access to the artificial intelligence breakthroughs made by the technology industry.So says a report submitted to Congress Monday by the National Security Commission on AI. The group, which includ…'
);


INSERT INTO "comment" (id, user_id, comment, date_commented, article_id)
VALUES
  (
    1,
    1,
    'This article is weird guyz, who upvoted this?',
    '2019-09-30 22:59:37',
    1
),
  (
    2,
    1,
    'This article is weak son',
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
-- INSERT INTO "article_vote" (id, vote_type, article_id)
VALUES 
(
  1,
  'null',
  -- 1,
  3
),
(
  2,
  'null',
  -- 2,
  2
),
(
  3,
  'null',
  -- 1,
  3
),
(
  4,
  'null',
  -- 3,
  1
);

SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('article_id_seq', (SELECT MAX(id) from "article"));
SELECT setval('comment_id_seq', (SELECT MAX(id) from "comment"));
SELECT setval('article_vote_id_seq', (SELECT MAX(id) from "article_vote"));

COMMIT;