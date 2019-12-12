const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const xss = require('xss');

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
  // before('clean the table', () => helpers.cleanTables(db));
  before('clean the table', () =>db.raw('TRUNCATE "article","user","comment","comment_vote","article_vote","save","bake" RESTART IDENTITY CASCADE'));
  //afterEach('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () =>db.raw('TRUNCATE "article","user","comment","comment_vote","article_vote","save","bake" RESTART IDENTITY CASCADE'));


  describe('GET /api/article/oven', () => {
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

    context('Given articles in the database', () => {
      beforeEach(() =>
        db.into('user').insert(testUsers)
      );
      beforeEach(() =>
        db.into('article').insert(testArticles)
      );
      it('responds with 200 and articles list', () => {
        const expectedArticleList=helpers.makeArticlesArray();
        return supertest(app)
          .get('/api/article/oven')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(expectedArticleList);
      });

    });
  });

  describe('Post/api/article',()=>{
    beforeEach(() =>
      db.into('user').insert(testUsers)
    );
    beforeEach(() =>
      db.into('article').insert(testArticles)
    );
    it('Posts new article,responding with 201 and articlelist with new article',()=>{
      const newArticle = {
        author:'test author',
        content:'test content',
        description:'test description',
        publish_at:new Date('2019-11-18T19:31:09Z'),
        source_name:'test source',
        title:'test title',
        url:'test url1',
        url_to_image:'test url_to_image1',
         
      };
      return supertest(app)
        .post('/api/article')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newArticle)
        .expect(201)
        .expect(res=>{
          expect(res.body[res.body.length-1]).to.have.property('id');
          expect(res.body[res.body.length-1].author).to.eql(newArticle.author);
          expect(res.body[res.body.length-1].content).to.eql(newArticle.content);
          expect(res.body[res.body.length-1].description).to.eql(newArticle.description);
          expect(res.body[res.body.length-1].sourece_name).to.eql(newArticle.sourece_name);
          expect(res.body[res.body.length-1].title).to.eql(newArticle.title);
          expect(res.body[res.body.length-1].url).to.eql(newArticle.url);
          expect(res.body[res.body.length-1].url_to_image).to.eql(newArticle.url_to_image);
        })
        .expect(res=>
          db
            .from('article')
            .select('*')
            .where({id:res.body[res.body.length-1].id})
            .then(row=>{
              expect(row[0].title).to.eql(newArticle.title);
            }));
    });

  });
  describe('GET /api/article/savedarticles', () => {
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
        return supertest(app)
          .get('/api/article/savedarticles')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(expectedSavedArticleList);
      });

    });
  });

  describe('Post/api/article/savedarticles',()=>{
    beforeEach(() =>
      db.into('user').insert(testUsers)
    );
    beforeEach(() =>
      db.into('article').insert(testArticles)
    );
    beforeEach(() =>
      db.into('save').insert(testSaveArticles)
    );
    it.only('Saves new article,responding with 201 and articlelist with new article',()=>{
      const userId=testUsers[0].id;
      console.log(userId)
      const saveArticle = {
        user_id:userId,
        article_id:'0a3891fb-c2b0-4fe7-b065-62ff1029ebcb' ,
      };
      return supertest(app)
        .post('/api/article/savedarticles')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(saveArticle)
        .expect(201)
        .expect(res=>{
          console.log(res.body[0])
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

});

