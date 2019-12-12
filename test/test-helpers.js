const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray(){
  return [
    {
      id: '4f56a915-f630-4b09-982d-8120c5590153',
      username: 'test-user-1',
      name:'user1',
      password: 'password',
      
    },
    {
      id: '0822d2aa-ae3a-41fc-8560-f41da5a7fd33',
      username: 'test-user-2',
      name:'user2',
      password: 'password',
      
    },
    {
      id: '39e90455-13f1-4316-a619-d318adfff8d6',
      username: 'test-user-3',
      name:'user3',
      password: 'password',
      
    },
    {
      id: '3f0b8222-2be6-435c-b954-bb2a37d0b727',
      username: 'test-user-4',
      name:'user4',
      password: 'password',
      
    },
  ];
}

function makeArticlesArray(){
  return[
    {
      author:'author1',
      content:'content1',
      description:'description1',
      id:'a273b067-19f4-4bb8-b84f-4408cc760e3c',
      posted_at: '2019-12-12T19:33:51.426Z',
      publish_at:'2019-11-18T19:31:09Z',
      source_name:'source1',
      title:'title1',
      url:'url1',
      url_to_image:'url_to_image1',
      vote_count:1, 
    },
    {
      vote_count:2,
      author:'author2',
      content:'content2',
      description:'description2',
      id:'52204397-f9bf-42ce-a88f-1e495aa69c5d',
      posted_at: '2019-12-12T19:33:51.426Z',
      publish_at:'2019-11-19T19:31:09Z',
      source_name:'source2',
      title:'title2',
      url:'url2',
      url_to_image:'url_to_image2',  
    },
    {
      author:'author3',
      content:'content3',
      description:'description3',
      id:'0a3891fb-c2b0-4fe7-b065-62ff1029ebcb',
      posted_at: '2019-12-12T19:33:51.426Z',
      publish_at:'2019-11-20T19:31:09Z',
      source_name:'source3',
      title:'title3',
      url:'url3',
      url_to_image:'url_to_image3',
      vote_count:3,   
    },
    {
      author:'author4',
      content:'content1',
      description:'description4',
      id:'832f989a-5a0b-4f10-bc45-36733e5e9ee1',
      posted_at: '2019-12-12T19:33:51.426Z',
      publish_at:'2019-11-18T19:31:09Z',
      source_name:'source4',
      title:'title4',
      url:'url4',
      url_to_image:'url_to_image4',
      vote_count:4,
    },
    {
      author:'author5',
      content:'content5',
      description:'description5',
      id:'9a2285ae-0dd9-4f12-a5ca-ec7b16134c7a',
      posted_at: '2019-12-12T19:33:51.426Z',
      publish_at:'2019-11-18T19:31:09Z',
      source_name:'source5',
      title:'title5',
      url:'url5',
      url_to_image:'url_to_image5',
      vote_count:5,
      
    },
  ];
}

function makeCommentsArray(users,articles){
  return[
    {
      id:'9a2285ae-0dd9-4f12-a5ca-ec7b16134c7a',
      user_id:users[0].id,
      comment:'comment1',
      date_commented:'2019-11-18T19:31:09Z',
      article_id:articles[0].id,
    },
    {
      id:'8a6b6cef-dd20-453c-bc9f-4a3893f5ac56',
      user_id:users[0].id,
      comment:'comment2',
      date_commented:'2019-11-19T19:31:09Z',
      article_id:articles[1].id,
    },
    {
      id:'f715f7de-b70a-4d6d-9b96-58dcd843c3bf',
      user_id:users[1].id,
      comment:'comment3',
      date_commented:'2019-11-19T19:31:09Z',
      article_id:articles[2].id,
    },
    {
      id:'f10ab2e9-3a2a-4e97-834f-6235f83948a5',
      user_id:users[2].id,
      comment:'comment4',
      date_commented:'2019-11-20T19:31:09Z',
      article_id:articles[3].id,
    },
    {
      id:'547876e0-afaa-477d-bec7-60a473e3c24b',
      user_id:users[3].id,
      comment:'comment5',
      date_commented:'2019-11-18T19:31:09Z',
      article_id:articles[4].id,
    },
  ];
}

function makeArticleVoteArray(users,articles){
  return[
    {
      id:'9a2285ae-0dd9-4f12-a5ca-ec7b16134c7a',
      user_id:users[0].id,
      article_id:articles[0].id,
      vote_type:false
    },
    {
      id:'9219f1b2-94ae-4ed7-810f-9ca81b072917',
      user_id:users[0].id,
      article_id:articles[1].id,
      vote_type:true
    },
    {
      id:'f78b6729-a18b-4ab8-ace1-589b800d355a',
      user_id:users[1].id,
      article_id:articles[2].id,
      vote_type:false
    },
    {
      id:'5287c45b-d377-4ff2-abeb-d33cb4a53039',
      user_id:users[2].id,
      article_id:articles[3].id,
      vote_type:null
    },
    {
      id:'573be0a0-c529-4fc7-8daf-fc9d5cb159c9',
      user_id:users[3].id,
      article_id:articles[4].id,
      vote_type:null
    },
  ];
}

function makeSaveArticlesArray(users, articles){
  return[
    {
      id:'c480c1eb-af36-4101-bb84-b60be5ca1f5a',
      user_id:users[0].id, 
      article_id:articles[0].id, 
      date_saved:'2019-11-18T19:31:09Z',
    },
    {
      id:'9044f8fe-4d19-469a-b8c4-e4a80e47f28b',
      user_id:users[0].id, 
      article_id:articles[1].id,
      date_saved:'2019-11-19T19:31:09Z',
    },
    {
      id:'bc34ed27-de76-4242-9da8-602e126b1e36',
      user_id:users[1].id, 
      article_id:articles[2].id, 
      date_saved:'2019-11-18T19:31:09Z',
    },
    {
      id:'c5ad3e1f-aad5-4a10-8c4b-0e75acc1edf9',
      user_id:users[2].id, 
      article_id:articles[3].id,
      date_saved:'2019-11-18T19:31:09Z',
    },
    {
      id:'c95d3a01-de4c-4a6d-91e2-9fd4f9a96ece',
      user_id:users[3].id, 
      article_id:articles[4].id,
      date_saved:'2019-11-18T19:31:09Z',
    },
  ];
}

function makeArticlesFixtures(){
  const testUsers = makeUsersArray();
  const testArticles = makeArticlesArray();
  const testComments = makeCommentsArray(testUsers,testArticles);
  const testArticleVote = makeArticleVoteArray(testUsers,testArticles);
  const testSaveArticles = makeSaveArticlesArray(testUsers,testArticles);
  return {testUsers, testArticles, testComments,testArticleVote,testSaveArticles};
}

function makeSavedArticleList(userId, savedArticles, articles) {
  const articlesMatchingUserId = savedArticles.filter(
    savedArticle => savedArticle.user_id === userId
  );

  const matchingArticles = [];
  matchingArticles.push(
    ...articlesMatchingUserId.map(uart => {
      return articles.filter(article => article.id === uart.article_id)[0];
    })
  );
  let matchingArticlesWithUserId= matchingArticles.map((item,i)=>Object.assign({},item,articlesMatchingUserId[i]))
  return matchingArticlesWithUserId
}


function seedUsers(db, users) {
  const usersWithPassword = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
   db.insert(usersWithPassword).into('user');
}

function seedArticles(db, articles) {
   db.insert(articles).into('article');
}

function seedComments(db, comments) {
   db.insert(comments).into('comment');
}

function seedArticleVote(db, articleVote) {
   db.insert(articleVote).into('article_vote');
}

function seedSaveArticle(db, saveArticle) {
   db.insert(saveArticle).into('save');
}
function cleanTables(db) {
   db.raw(
    `TRUNCATE
        article,
        user,
        comment,
        article_vote,
        comment_vote,
        save,
        bake
        RESTART IDENTITY CASCADE;
      `
    
  );
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({id: user.id,name:user.name}, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports={
  makeUsersArray,
  makeArticlesArray,
  makeCommentsArray,
  makeArticleVoteArray,
  makeSaveArticlesArray,
  makeArticlesFixtures,
  makeSavedArticleList,
  seedUsers,
  seedArticles,
  seedComments,
  seedArticleVote,
  seedSaveArticle,
  makeAuthHeader,
  cleanTables,
};