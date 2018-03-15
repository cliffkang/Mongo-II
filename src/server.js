const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const Posts = require('./post.js');

const server = express();

server.use(express.json());

// TODO: write your route handlers here

server.get('/accepted-answer/:soID', (req, res) => {
   const { soID } = req.params;
   Posts.find({ soID: soID }) // finds question
      .then(question => {
         Posts.find({ soID: question[0].acceptedAnswerID })
            .then(answer => {
               res.status(STATUS_SUCCESS).send(answer);
            })
            .catch(err => {
               res.status(STATUS_USER_ERROR).send({
                  error: 'Could not find the related answer from question ID',
               });
            });
      })
      .catch(err =>
         res
            .status(STATUS_USER_ERROR)
            .send({ error: 'Error finding the given question ID' })
      );
});

server.get('/top-answer/:soID', (req, res) => {
   const { soID } = req.params;
   Posts.find({ parentID: soID }) // finds question
      .then(answers => {
         res.status(STATUS_SUCCESS);
         res.send(answers.sort((a, b) => {
            return b.score - a.score;
         })[1]);
      })
      .catch(err =>
         res
            .status(STATUS_USER_ERROR)
            .send({ error: 'Error finding the given parent ID' })
      );
});

module.exports = { server };
