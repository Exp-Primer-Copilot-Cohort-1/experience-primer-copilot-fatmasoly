// Create web server and listen for requests on port 3000
// Use the express module for the web server
const express = require('express');
const app = express();
const port = 3000;

// Use the body-parser module to parse incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use the comments module to interact with the comments data
const comments = require('./comments');

// Use the fs module to read the HTML file
const fs = require('fs');

// Respond with the comments data for the GET /comments route
app.get('/comments', (req, res) => {
  res.json(comments.getComments());
});

// Respond with the comments data for the POST /comments route
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.addComment(comment);
  res.json(comments.getComments());
});

// Respond with the comments data for the DELETE /comments route
app.delete('/comments', (req, res) => {
  comments.deleteComments();
  res.json(comments.getComments());
});

// Respond with the HTML file for the GET / route
app.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Start the web server on port 3000
app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});

// Path: comments.js
// Create an array to store the comments data
const comments = [];

// Return the comments data
function getComments() {
  return comments;
}

// Add a new comment to the comments data
function addComment(comment) {
  comments.push(comment);
}

// Delete all comments from the comments data
function deleteComments() {
  comments.length = 0;
}

// Export the functions for use in the web server
module.exports = {
  getComments,
  addComment,
  deleteComments
};
