// Create web server
// Start server: node comments.js

var http = require('http');
var url = require('url');
var querystring = require('querystring');

var comments = [];

var server = http.createServer(function (req, res) {

    var parsedUrl = url.parse(req.url);
    var parsedQuery = querystring.parse(parsedUrl.query);
    var pathname = parsedUrl.pathname;

    switch (pathname) {
        case '/':
            showHomepage(req, res);
            break;
        case '/create':
            createComment(req, res, parsedQuery);
            break;
        case '/delete':
            deleteComment(req, res, parsedQuery);
            break;
        default:
            res.end('404 not found');
    }
});

function showHomepage(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><head><title>Comment Board</title></head>');
    res.write('<body>');
    res.write('<form action="/create" method="get">');
    res.write('<input type="text" name="comment">');
    res.write('<input type="submit" value="submit">');
    res.write('</form>');
    res.write('<ul>');
    for (var i = 0; i < comments.length; i++) {
        res.write('<li>' + comments[i] + ' <a href="/delete?index=' + i + '">delete</a></li>');
    }
    res.write('</ul>');
    res.write('</body></html>');
    res.end();
}

function createComment(req, res, parsedQuery) {
    var comment = parsedQuery.comment;
    comments.push(comment);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
}

function deleteComment(req, res, parsedQuery) {
    var index = parsedQuery.index;
    comments.splice(index, 1);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
}

server.listen(3000, function () {
    console.log('Server is running...');
});