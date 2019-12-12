const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Article Endpoints', function() {
  let db;
  const {
    testUsers,
    testArticles,
    testComments,
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

  describe('GET /api/vote', () => {
    context('Given no articles in the database', () => {
      
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/article/oven')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });

    });
});