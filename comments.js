// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, (result) => {
            console.log(result);
            fs.appendFile('comments.txt', JSON.stringify(result) + '\n', (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Comment saved');
                res.end('Comment saved');
            });
        });
    } else {
        res.end(
            `
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="userName" placeholder="Enter your name" required />
                    <input type="text" name="comment" placeholder="Enter your comment" required />
                    <button type="submit">Save</button>
                </form>
            </body>
            </html>
            `
        );
    }
});

server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}