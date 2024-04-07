// create web server 
// import http module
const http = require('http');
// import fs module
const fs = require('fs');
// import url module
const url = require('url');

// create server
http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    // get file path
    const filePath = `./data/${query.id}.json`;
    // get file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // get file content to json
    const comments = JSON.parse(fileContent);
    // get comments
    let commentsStr = '';
    comments.forEach((comment) => {
        commentsStr += `${comment.name}: ${comment.content}<br>`;
    });

    // if the request url is /getComments
    if (pathName === '/getComments') {
        // response
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(commentsStr);
    } else {
        // if the request url is not /getComments
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('404 Not Found');
    }

}).listen(3000, () => {
    console.log('Server is running...');
});
