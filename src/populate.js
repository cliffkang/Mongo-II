const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');

let savedPosts = null;

const Posts = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('../posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

// const populatePosts = () => {
//   const posts = readPosts();
//   const stacks = posts.map(post => {
//     return new Posts(post).save();
//   });
//   return Promise.all(stacks)
//     .then(console.log('promise all completed'))
//     .catch(err => console.error('error in the Promise All'));
// };

// populatePosts();

mongoose
.connect('mongodb://localhost/so-posts')
  Posts.create(readPosts())
  .then(() => {
    console.log('population succeded');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('database connection failed');
  });
