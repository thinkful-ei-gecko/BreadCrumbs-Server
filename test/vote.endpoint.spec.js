const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Article Endpoints', function() {
  let db;
  const {
    testUsers,
    testArticles,
    testArticleVote,
  } = helpers.makeArticlesFixtures();

  

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('clean the table', () =>db.raw('TRUNCATE "article","user","comment","comment_vote","article_vote","save","bake" RESTART IDENTITY CASCADE'));
  afterEach('cleanup', () =>db.raw('TRUNCATE "article","user","comment","comment_vote","article_vote","save","bake" RESTART IDENTITY CASCADE'));

  describe('PATCH /api/vote', () =>{

    context('Updating the vote type',()=>{
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      beforeEach(() =>
        db.into('article').insert(testArticles)
      );
      beforeEach(() =>
        db.into('article_vote').insert(testArticleVote)
      );
      it('responds with 201 and updates the vote type', () => {
        const userId=testUsers[0].id;
        
        const updateVote = {
          user_id:userId,
          article_id:'a273b067-19f4-4bb8-b84f-4408cc760e3c',
          vote_type:true
        };
        return supertest(app)
          .patch('/api/vote')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(updateVote)
          .expect(201);
       
      });

    });
  });

});