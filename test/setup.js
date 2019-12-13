require('dotenv').config()

process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'

process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || 'postgresql://admin@localhost/breadcrumbs-test'

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect;
global.supertest = supertest;