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

  describe('GET /api/comment/:article_id', () => {
    context('Given articles in the database', () => {
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      beforeEach(() =>
        db.into('article').insert(testArticles)
      );
      beforeEach(() =>
        db.into('comment').insert(testComments)
      );
      it('responds with 200 and gets comments for article by artcle id', () => {
        const articleId ='a273b067-19f4-4bb8-b84f-4408cc760e3c';
        return supertest(app)
          .get(`/api/comment/${articleId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res=>{
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('comment');
            expect(res.body[0].article_id).to.eql(articleId);
          });
      });

    });
  });

  describe('Post/api/comment',()=>{
    beforeEach(() =>
      db.into('user').insert(testUsers)
    );
    beforeEach(() =>
      db.into('article').insert(testArticles)
    );
    beforeEach(() =>
      db.into('comment').insert(testComments)
    );
    it('Posts comment,responding with 201 and with new comment',()=>{
      const userId=testUsers[0].id;
      const newComment = {
        user_id:'4f56a915-f630-4b09-982d-8120c5590153',
        comment:'New Comment',
        article_id:'0a3891fb-c2b0-4fe7-b065-62ff1029ebcb' ,
      };
      return supertest(app)
        .post('/api/comment')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newComment)
        .expect(201)
        .expect(res=>{
          expect(res.body).to.have.property('id');
          expect(res.body.user_id).to.eql(newComment.user_id);
          expect(res.body.article_id).to.eql(newComment.article_id);
        })
        .expect(res=>
          db
            .from('comment')
            .select('*')
            .where({id:res.body.id})
            .then(row=>{
              expect(row[0].article_id).to.eql(newComment.article_id);
            }));
    });

  });

});