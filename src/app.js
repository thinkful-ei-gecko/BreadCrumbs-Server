require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');

const authRouter = require("./auth/auth-router");
const userRouter = require("./user/user-router");
const articleRouter = require("./article/article-router");
const voteRouter = require("./vote/vote-router");
const commentRouter = require("./comment/comment-router");





const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/article", articleRouter);
app.use("/api/vote", voteRouter);
// app.use("/api/comment", commentRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!')
});

app.use(errorHandler)

module.exports = app;