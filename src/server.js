const express = require('express');

const STATUS_USER_ERROR = 422;

const server = express();

server.use(express.json());

// TODO: write your route handlers here

module.exports = { server };
