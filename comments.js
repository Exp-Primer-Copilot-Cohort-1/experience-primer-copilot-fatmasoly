// create web server 
// load express module
const express = require('express');
// create web server
const app = express();
// load body-parser module
const bodyParser = require('body-parser');
// load comments module
const comments = require('./comments');
// load cors module
const cors = require('cors');
// use cors
app.use(cors());
// use body-parser
app.use(bodyParser.json());
// get all comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});
// add a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.addComment(comment);
    res.json(comment);
});
// delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.deleteComment(id);
    res.json(id);
});
// update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    comments.updateComment(id, comment);
    res.json(comment);
});
// start web server
app.listen(3000, () => {
    console.log('Web server is up and running');
});