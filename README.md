# Live App: [Breadcrumbs News Aggregator](https://breadcrumbs.now.sh/)  



## Project Description:  

Breadcrumbs is a reenvisioned news aggregator that aims to eliminate "gatekeeping" and partisanship found on more traditional platforms which rely on manual aggregation by a select few editors. Breadcrumbs utilizes a decentralized and anonymous voting system, through which the users will determine each articles value. The resulting value will affect the visibility of articles, with more valuable articles rising to the top of the user feed. Every 15 minutes Breadcrumbs will automatically feed fresh news from over 30,000 unique online publishers to its users to read, evaluatate, archive, and discuss.



## Team: 

> ![hotdog](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-small/1f32d@2x.png) [Shawn Collette](https://github.com/Shawn-Collette) 
> 
> ![hotdog](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-small/1f32d@2x.png) [James W Lee](https://github.com/Xleex23) 
> 
> ![hotdog](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-small/1f32d@2x.png) [Steven Bull](https://github.com/StevenWBull) 
> 
> ![hotdog](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-small/1f32d@2x.png) [Nandana Rao](https://github.com/Nrrao) 
> 
> ![hotdog](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-small/1f32d@2x.png) [Badri Narayana Tulsiram](https://github.com/Badri-Narayan)



## Endpoints 
| Method|  Path	| Function |   Active JWT Req.  |
| --|  --	|  --	|  --  |
| POST|  /api/user | User registration.  Requires 'username' (unique), 'password', and 'name'.  | NO |
| POST | /api/user/token | If 'username' and 'password' are correct, client is issued a JWT.  | NO |
| PUT | /api/auth/token | If client currently possess a valid JWT, confirms and issues a fresh JWT. |  YES   |
| POST | /api/article |  Save an article from external API feed to DB. | YES |
| GET | /api/article/oven |  Returns all articles saved in DB.  | YES |
|PATCH  | /api/vote |  User vote (up or down) is sent to DB for validation.  If user has not voted OR changed their vote, user vote status is updated and the new vote_count on the relevant article or comment is updated and returned to client. | YES |
|GET  | /api/save |  Returns all articles saved by the requesting user. | YES |
|POST |  /api/save | Saves an article which is bound to the requesting user_id.  | YES |
| DELETE| /api/save/:id |  Deletes the article with corresponding article_id from the saved article table with requesting user's user_id. | YES |
| POST|  /api/comment |  Submits a new comment which is bound to the relevant article_id and requesting user_id | YES |
| GET | /api/comment/:article_id |   Returns all comments bound to the specified article_id.  | YES |
|PATCH  | /api/update | [Active JWT required]  Confirms 'password', if valid, sets a new 'username' (unique) and/or 'name.'  | YES |
|DELETE |  /api/update |  Deletes the the account with corresponding user_id. | YES |
|PATCH  |/api/update/password |  Confirms 'password', if valid, sets password to the value of 'new_password.'  | YES |





# User stories

#### 1.)  As an informed citizen, I want to be able to review news from wide variety of sources without bias or partisan filtering.  

-   No central point of content control.
-   News from as many sources as possible.
-   A constant stream of new articles, regardless of the time or day of the week.


#### 2.)  I'm interested in information, not clickbait or vapid articles.

-   Users can quickly preview the article, and not just rely on the article's title or editor's tagline.
-   Users can see the source of each article.
-   Users can view the author's name.
-   If interested in the article, users can click to view the complete article in a new tab.


#### 3.)  I am a believer in the power of Decentralized Autonomous Organizations (DAOs).  As such, I would like to  see a method for user to be able to determine the visibility/popularity of content with organic unincentivized user voting.

- Users can select articles from the API stream to submit to their peers for voting.
- Voting is not rewarded, thus keeping it honest.
- Users can add value or subtract value from articles.


#### 4.) If I have limited time or do not feel like contributing to the DAO voting system, I would like to be able to view articles that are currently highly rated by my peers.


- Users can, at any time, view the current hierarchy of user voted articles.
- Articles with the most positive vote totals should be the most visible.


#### 5.)  If I am interested in a specific subject, I would like to be able to hone or filter my results without penalty.

- Users can view articles by subject matter at any time.
- Users can continue to use the DAO voting system while filtering results.


#### 6.) As a user who has unique insight and opinions, I would like to be able to interact with other users in a social manner.

- User commenting on articles.
- User voting on posted comments.
- Users comments are NOT anonymous, but votes are.


#### 7.) If I find an article that I want to access at a later date, I should be able to save it.

- Users can archive articles permanently.
- Archived articles are user specific, and thus private.
- Archived articles can be removed from the user's list.
- Archived articles do not display vote values. In this case the opinion of the users peers is inconsequential.


#### 8.)  As a user who values privacy, I want total control over my account.

- Users can change their public facing name/handle.
- Users can change their login information (username and password).
- Users can permanently delete their account. 



## Spin up:

#### 1.) Clone repository to your local machine:

```
git clone https://github.com/thinkful-ei-gecko/BreadCrumbs-Server.git

```

### 2.) Rename

#### 2.) Install NPM:

```
npm install

```

#### 3.) Install the required dependencies:

```
npm i

```

#### 4.) Start the server:

```
npm start

```

### Core Technologies Used:
-  node
-  postgreSQL
-  express

### Packages Used:
- jsonwebtoken
- bcrypt.js
- UUID
- XSS
- cors
- helmet
- knex.js
- nodemon
- postgrator
- chai
- mocha
- supertest
#
|  Repository  |  Link  |
| -- |  -- |
|  Front-end  |  [https://github.com/thinkful-ei-gecko/BreadCrumbs-Client](https://github.com/thinkful-ei-gecko/BreadCrumbs-Client)  |  
|  Back-end  |   [https://github.com/thinkful-ei-gecko/BreadCrumbs-Server](https://github.com/thinkful-ei-gecko/BreadCrumbs-Server)  |  
 


