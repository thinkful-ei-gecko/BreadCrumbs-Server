BEGIN;


TRUNCATE
  "bake",
  "save",
  "comment_vote",
  "article_vote",
  "article",
  "comment",
  "user";


INSERT INTO "user" (id, username, name, password)
VALUES
  (
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'admin',
  'Admin',
  -- password = 'pass'
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
),
  (
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'guest',
  'Guest',
  -- password = 'pass'
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
),
  (
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  'demo',
  'Demo',
  -- password = 'pass'
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
);


INSERT INTO "article" (id, vote_count, author, title, description, source_name, url, url_to_image, publish_at, content)
VALUES
(
  'e6cdd77b-dc7d-4450-9661-e6b7787fb325',
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
  '410d5894-4946-4c1a-abad-552642dc55fc',
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
  'a1385155-5a02-4f8a-bfdc-e3a5379dbea0',
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
  '9a944db6-94f1-42e2-abaf-94c0cc09faa8',
  165,
  'Andrew Williams',
  'Report: The Government and Tech Need to Cooperate on AI',
  'It also warns that AI-enhanced national security apparatus like autonomous weapons and surveillance systems will raise ethical questions.',
  'Wired',
  'https://www.wired.com/story/report-government-and-tech-need-cooperate-ai/',
  'https://media.wired.com/photos/5dc0903041c1680009813bd9/191:100/w_1280,c_limit/Biz-Schmidt-h_15275095.jpg',
  '2019-11-05T12:00:00Z',
  'Americas national security depends on the government getting access to the artificial intelligence breakthroughs made by the technology industry.So says a report submitted to Congress Monday by the National Security Commission on AI. The group, which includ…'
),
(
  'e9baa01d-95c8-46ac-a6bd-e2f9f4258f3a',
  77,
  'Ingrid Lunden',
  'Vouch raises $45M led by YC Continuity for business insurance that targets startups',
  '“Move fast and break things” is a term we usually associate with Facebook (at least, until 2014) and the general startup ethos of being disruptive. Now in true entrepreneurial fashion, the phrase is finding itself as the center of — what else — a startup idea…"',
  'TechCrunch',
  'http://techcrunch.com/2019/11/20/vouch-raises-45m-led-by-yc-continuity-for-business-insurance-that-targets-startups/',
  'https://techcrunch.com/wp-content/uploads/2019/10/GettyImages-1015140194.jpg?w=600',
  '2019-11-20T15:12:33Z',
  '“Move fast and break things” is a term we usually associate with Facebook (at least, until 2014) and the general startup ethos of being disruptive. Now in true entrepreneurial fashion, the phrase is finding itself as the center of — what else — a startup idea…"'
),
(
  'aaa444de-c6f6-4ff8-ae24-a2c2d4cec5f0',
  1,
  'Trish Bendix',
  'Late Night Is Tickled by Gordon Sondland’s Impeachment Testimony',
  '"In order to catch a selfish, idiotic hotel business guy, you have to send a selfish, idiotic hotel business guy,” Samantha Bee joked Wednesday.',
  'The New York Times',
  'https://www.nytimes.com/2019/11/21/arts/television/late-night-gordon-sondland-impeachment.html',
  'https://static01.nyt.com/images/2019/11/21/arts/21latenight/21latenight-facebookJumbo.png',
  '2019-11-21T07:58:20Z',
  'You know what these hearings could use? A guy who paid a million dollars for his ambassadorship. Not only did Sondland leave Trumps defense in tatters, he also implicated Mick Mulvaney, Mike Pompeo and Mike Pence, and he did it as happily as if …'
),
(
  '08723f6f-f683-46ed-86e7-48d016b41d09',
  99,
  'Boone Ashworth',
  'Stripe CEO Patrick Collison on Crypto, China, and Fixing the Web',
  'In a conversation at WIRED25, the online payments CEO talks about cryptocurrency, government regulation, the housing crisis, and doing business in China.',
  'Wired',
  'https://www.wired.com/story/patrick-collison-stripe-wired25/',
  'https://media.wired.com/photos/5dc5d66cc955950008b267c4/191:100/w_1280,c_limit/W25_PatrickCollison_Phucpham_4N9A9090.jpg',
  '2019-11-08T21:50:37Z',
  'Patrick Collison, cofounder of online payment system Stripe, thinks that even with its wide-ranging and well-documented problems, the internet is still amazing. The key questionwhy arent things getting better fasteris something that we should be totally obse… '
),
(
  '5054c37f-5273-428a-ad8e-5c29be9a40d4',
  191,
  'Molly Wood',
  'The Future of Banking Is … Youre Broke',
  'Instagram has helped blur the lines between personal branding and personal life—such as by encouraging people to turn their profiles into businesses.',
  'Wired',
  'https://www.wired.com/story/the-future-of-banking-is-youre-broke/',
  'https://media.wired.com/photos/5dcc716bb8fdfa0008290a69/191:100/w_1280,c_limit/Ideas-crumpleddollar-130901213-2.jpg"',
  '2019-11-14T14:00:00Z',
  'Americas national security depends on the government getting access to the artificial intelligence breakthroughs made by the technology industry.So says a report submitted to Congress Monday by the National Security Commission on AI. The group, which includ…'
),
(
  '0c40008d-f50d-4275-bcb9-6562d8d326d5',
  11,
  'Louise Matsakis',
  'Instagram Business Accounts and My Friend, the Grocery Store',
  'Instagram has helped blur the lines between personal branding and personal life—such as by encouraging people to turn their profiles into businesses.',
  'Wired',
  'https://www.wired.com/story/instagram-business-accounts-analytics/',
  'https://media.wired.com/photos/5dcc8b14f3485600081260d8/191:100/w_1280,c_limit/Cul-insta-989696170.jpg',
  '2019-11-15T15:09:20Z',
  'Instagram began testing hiding public like counts globally on Thursday, after experimenting with the design tweak in several individual markets abroad. People who upload photos and videos will still know how many people liked themthat information just wont be…'
);



INSERT INTO "comment" (id, user_id, comment, date_commented, article_id)
VALUES
  (
    '3a8aee05-1787-4759-8afc-a3265cdc0c03',
    'a2424f48-132a-435c-8488-d1fc00d7afef',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-03 22:59:37',
    'e6cdd77b-dc7d-4450-9661-e6b7787fb325'
),
  (
    '5aab087f-1804-4e66-9dcf-3167920b4029',
    'a2424f48-132a-435c-8488-d1fc00d7afef',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-03 22:59:37',
    '410d5894-4946-4c1a-abad-552642dc55fc'
),
  (
    '720d9619-ec84-464a-9415-9fbbc3282bc9',
    'a2424f48-132a-435c-8488-d1fc00d7afef',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-02 22:59:37',
    'a1385155-5a02-4f8a-bfdc-e3a5379dbea0'
),
  (
    '772170f1-1f21-43a0-b922-d035834ce19f',
    '0cc08532-b8d8-434f-84be-91993b6a5488',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-031 22:59:37',
    '9a944db6-94f1-42e2-abaf-94c0cc09faa8'
),
  (
    '6dab56ce-e745-45d5-85b7-952eca959498',
    '0cc08532-b8d8-434f-84be-91993b6a5488',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-03 22:59:37',
    'e9baa01d-95c8-46ac-a6bd-e2f9f4258f3a'
),
  (
    '345219c5-f988-4442-913f-ac8f5add7135',
    '0cc08532-b8d8-434f-84be-91993b6a5488',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-03 22:59:37',
    'aaa444de-c6f6-4ff8-ae24-a2c2d4cec5f0'
),
  (
    '2e1d81c9-d6f8-4642-b1c0-b32ff9a2fac7',
    'c5885553-dcae-4b77-a28a-5335fa15ef0c',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-02 22:59:37',
    '08723f6f-f683-46ed-86e7-48d016b41d09'
),
  (
    '489faace-5959-4b5c-afe5-7b17d0f97087',
    'c5885553-dcae-4b77-a28a-5335fa15ef0c',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-031 22:59:37',
    '5054c37f-5273-428a-ad8e-5c29be9a40d4'
),
(
    '4b710a05-734b-4a04-8aef-357fe005bf50',
    'c5885553-dcae-4b77-a28a-5335fa15ef0c',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '2019-12-031 22:59:37',
    '0c40008d-f50d-4275-bcb9-6562d8d326d5'
  );



INSERT INTO "article_vote" (id, user_id, article_id)
VALUES 
(
  '36e0dd35-825b-4a9d-96d7-1da202e1657d',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'e6cdd77b-dc7d-4450-9661-e6b7787fb325'
),
(
  '28d6e3e4-177b-4d26-a18b-3e234c718f16',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '410d5894-4946-4c1a-abad-552642dc55fc'
),
(
  '98dbba5f-bd61-44e5-81b1-4e794dbde5df',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'a1385155-5a02-4f8a-bfdc-e3a5379dbea0'
),
(
  '7ad77046-9c0b-4c08-bae7-eeebf438a561',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '9a944db6-94f1-42e2-abaf-94c0cc09faa8'
),
(
  'e3a171fd-2c93-40ea-9831-c7ca1bb1b4c3',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'e9baa01d-95c8-46ac-a6bd-e2f9f4258f3a'
),
(
  'c2151baf-d3ce-4585-87b2-f35b4fe3ed77',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'aaa444de-c6f6-4ff8-ae24-a2c2d4cec5f0'
),
(
  '7ada4a73-20d0-400d-b33f-312c52f83b1b',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '08723f6f-f683-46ed-86e7-48d016b41d09'
),
(
  'f45b1cf3-a670-4571-8bf5-0bf7465a8e92',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '5054c37f-5273-428a-ad8e-5c29be9a40d4'
),
(
  '865e289a-d2b0-48ab-b444-e5cdc1fc6fe8',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '0c40008d-f50d-4275-bcb9-6562d8d326d5'
);



INSERT INTO "comment_vote" (id, user_id, comment_id)
VALUES 
(
  '36e0dd35-825b-4a9d-96d7-1da202e1657d',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '3a8aee05-1787-4759-8afc-a3265cdc0c03'
),
(
  '28d6e3e4-177b-4d26-a18b-3e234c718f16',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '5aab087f-1804-4e66-9dcf-3167920b4029'
),
(
  '98dbba5f-bd61-44e5-81b1-4e794dbde5df',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '720d9619-ec84-464a-9415-9fbbc3282bc9'
),
(
  '7ad77046-9c0b-4c08-bae7-eeebf438a561',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '772170f1-1f21-43a0-b922-d035834ce19f'
),
(
  'e3a171fd-2c93-40ea-9831-c7ca1bb1b4c3',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '6dab56ce-e745-45d5-85b7-952eca959498'
),
(
  'c2151baf-d3ce-4585-87b2-f35b4fe3ed77',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '345219c5-f988-4442-913f-ac8f5add7135'
),
(
  '7ada4a73-20d0-400d-b33f-312c52f83b1b',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '2e1d81c9-d6f8-4642-b1c0-b32ff9a2fac7'
),
(
  'f45b1cf3-a670-4571-8bf5-0bf7465a8e92',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '489faace-5959-4b5c-afe5-7b17d0f97087'
),
(
  '865e289a-d2b0-48ab-b444-e5cdc1fc6fe8',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '4b710a05-734b-4a04-8aef-357fe005bf50'
);

INSERT INTO "save" (id, user_id, article_id, date_saved)
VALUES 
(
  'bcc21264-0bbc-491b-8cc1-7c8222ed368c',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'e6cdd77b-dc7d-4450-9661-e6b7787fb325',
  '2019-12-03T23:12:51Z'
),
(
  '6fd48aaa-4b03-4cfc-a9be-0259919b4e13',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '410d5894-4946-4c1a-abad-552642dc55fc',
  '2019-12-03T23:12:52Z'
),
(
  'e64355ce-da6c-4a3f-a04d-87739bc81378',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'a1385155-5a02-4f8a-bfdc-e3a5379dbea0',
  '2019-12-03T23:12:53Z'
),
(
  'e92058e8-9902-4c64-9061-213bc73839aa',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '9a944db6-94f1-42e2-abaf-94c0cc09faa8',
  '2019-12-03T23:12:54Z'
),
(
  '46d780b6-f098-4f69-b7dc-0289474b2118',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'e9baa01d-95c8-46ac-a6bd-e2f9f4258f3a',
  '2019-12-03T23:12:55Z'
),
(
  '16a543fd-6fec-4448-9623-bf10bc6f2c85',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'aaa444de-c6f6-4ff8-ae24-a2c2d4cec5f0',
  '2019-12-03T23:12:56Z'
),
(
  '9567f69f-a0bd-4342-b0dc-a06f3599169c',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '08723f6f-f683-46ed-86e7-48d016b41d09',
  '2019-12-03T23:12:57Z'
),
(
  '728f9302-2a2b-4bcc-9b73-00d87bee04b2',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '5054c37f-5273-428a-ad8e-5c29be9a40d4',
  '2019-12-03T23:12:58Z'
),
(
  'ce8bb9b3-6759-44b9-ae58-fa9170ae1cef',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '0c40008d-f50d-4275-bcb9-6562d8d326d5',
  '2019-12-03T23:12:59Z'
);

INSERT INTO "bake" (id, user_id, article_id, date_baked)
VALUES 
(
  'bcc21264-0bbc-491b-8cc1-7c8222ed368c',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'e6cdd77b-dc7d-4450-9661-e6b7787fb325',
  '2019-12-03T23:12:51Z'
),
(
  '6fd48aaa-4b03-4cfc-a9be-0259919b4e13',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  '410d5894-4946-4c1a-abad-552642dc55fc',
  '2019-12-03T23:12:52Z'
),
(
  'e64355ce-da6c-4a3f-a04d-87739bc81378',
  'a2424f48-132a-435c-8488-d1fc00d7afef',
  'a1385155-5a02-4f8a-bfdc-e3a5379dbea0',
  '2019-12-03T23:12:53Z'
),
(
  'e92058e8-9902-4c64-9061-213bc73839aa',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  '9a944db6-94f1-42e2-abaf-94c0cc09faa8',
  '2019-12-03T23:12:54Z'
),
(
  '46d780b6-f098-4f69-b7dc-0289474b2118',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'e9baa01d-95c8-46ac-a6bd-e2f9f4258f3a',
  '2019-12-03T23:12:55Z'
),
(
  '16a543fd-6fec-4448-9623-bf10bc6f2c85',
  '0cc08532-b8d8-434f-84be-91993b6a5488',
  'aaa444de-c6f6-4ff8-ae24-a2c2d4cec5f0',
  '2019-12-03T23:12:56Z'
),
(
  '9567f69f-a0bd-4342-b0dc-a06f3599169c',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '08723f6f-f683-46ed-86e7-48d016b41d09',
  '2019-12-03T23:12:57Z'
),
(
  '728f9302-2a2b-4bcc-9b73-00d87bee04b2',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '5054c37f-5273-428a-ad8e-5c29be9a40d4',
  '2019-12-03T23:12:58Z'
),
(
  'ce8bb9b3-6759-44b9-ae58-fa9170ae1cef',
  'c5885553-dcae-4b77-a28a-5335fa15ef0c',
  '0c40008d-f50d-4275-bcb9-6562d8d326d5',
  '2019-12-03T23:12:59Z'
);

COMMIT;