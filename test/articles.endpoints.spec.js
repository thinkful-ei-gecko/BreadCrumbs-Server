const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Article Endpoints', function() {
  let db;
  const {
    testUsers,
    testArticles,
  } = helpers.makeArticlesFixtures;
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('clean the table', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));
  

  //seed the table
  beforeEach('insert data into all tables', async () => {
    await helpers.seedUsers(db, testUsers);
    await helpers.seedArticles(db, testArticles);
   
  });
  
  describe('GET /api/article/oven', () => {
    context('Given no articles in the database', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/article/oven')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });

    });

    context('Given articles in the database', () => {
      it('responds with 200 and articles list', () => {
        
        const expectedArticleList=helpers.makeArticlesArray;

        return supertest(app)
          .get('/api/article/oven')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200,expectedArticleList );
      });

    });
  });
});

