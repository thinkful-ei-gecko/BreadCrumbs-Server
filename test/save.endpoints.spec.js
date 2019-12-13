const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Article Endpoints', function() {
  let db;
  const {
    testUsers,
    testArticles,
    testSaveArticles,
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


  describe('GET /api/save', () => {
    context('Given articles in the database', () => {
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      beforeEach(() =>
        db.into('article').insert(testArticles)
      );
      beforeEach(() =>
        db.into('save').insert(testSaveArticles)
      );
   
      it('responds with 200 and saved articles list', () => {
        const userId=testUsers[0].id;
        const expectedSavedArticleList=helpers.makeSavedArticleList(userId,testSaveArticles,testArticles);
        console.log(expectedSavedArticleList)
        return supertest(app)
          .get('/api/save/savedarticles')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(expectedSavedArticleList);
      });

    });
  });

  describe('Post/api/save',()=>{
    beforeEach(() =>
      db.into('user').insert(testUsers)
    );
    beforeEach(() =>
      db.into('article').insert(testArticles)
    );
    beforeEach(() =>
      db.into('save').insert(testSaveArticles)
    );
    it('Saves new article,responding with 201 and articlelist with new article',()=>{
      const userId=testUsers[0].id;
      console.log(userId);
      const saveArticle = {
        user_id:userId,
        article_id:'0a3891fb-c2b0-4fe7-b065-62ff1029ebcb' ,
      };
      return supertest(app)
        .post('/api/save')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(saveArticle)
        .expect(201)
        .expect(res=>{
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0].user_id).to.eql(saveArticle.user_id);
          expect(res.body[0].article_id).to.eql(saveArticle.article_id);
        })
        .expect(res=>
          db
            .from('save')
            .select('*')
            .where({id:res.body[0].id})
            .then(row=>{
              expect(row[0].article_id).to.eql(saveArticle.article_id);
            }));
    });

  });

  describe('DELETE /api/save/:id', () => {
   
    context('Given there are articles in the database', () => {
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      beforeEach(() =>
        db.into('article').insert(testArticles)
      );
      beforeEach(() =>
        db.into('save').insert(testSaveArticles)
      );
      it('responds with 201 and removes the article', () => {
        const userId=testUsers[0].id;
        const idToRemove = 'c95d3a01-de4c-4a6d-91e2-9fd4f9a96ece';
        const expectedSavedArticleList=helpers.makeSavedArticleList(userId,testSaveArticles,testArticles);
        const expectedArticlesAfterDelete = expectedSavedArticleList.filter(article => article.id !== idToRemove);
        return supertest(app)
          .delete(`/api/save/${idToRemove}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(201)
          .then(res =>
            supertest(app)
              .get('/api/save')
              .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
              .expect(expectedArticlesAfterDelete)
          );
      });
    });
  });


});

