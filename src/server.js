const express = require('express');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(express.json());

// TODO: write your route handlers here

module.exports = { server };
