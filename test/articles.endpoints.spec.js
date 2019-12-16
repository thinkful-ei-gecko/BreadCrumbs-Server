const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Article Endpoints', function() {
  let db;
  const {
    testUsers,
    testArticles,
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
        const articleList=helpers.makeArticlesArray();
        const expectedArticleList = articleList.sort((a,b)=>b.vote_count-a.vote_count)
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
        publish_at:'2019-11-18T19:31:09Z',
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
});

