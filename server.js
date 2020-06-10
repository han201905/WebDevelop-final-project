var http = require("http");
var fs = require('fs');


var htmlContent = fs.readFileSync('home.html');
var cssContent = fs.readFileSync('style.css');
var jsContent = fs.readFileSync('index.js');


console.log("PORT:", process.env.PORT);


function requestHandler(req, res) {
    console.log("method:", req.method);
    console.log("url:", req.url);
    console.log("headers:", req.headers);

    if (req.url == 'home.html') {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(htmlContent);
    } else if (req.url == 'style.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        res.write(cssContent);
    } else if (req.url == 'index.js') {
        res.writeHead(200, {
            "Content-Type": "application/javascript"
        });
        res.write(jsContent);
    }
    // } else if (req.url == '/404.html') {
    //     res.writeHead(200, {
    //         "Content-Type": "text/html"
    //     });
    //     res.write(noFoundContent);
    // } else {
    //     res.writeHead(404, {
    //         "Content-Type": "text/html"
    //     });
    //     res.write(noFoundContent);
    // }
    res.end();
}

var server = http.createServer(requestHandler);

var port = process.env.PORT;
if (!port) { port = 3000; }

server.listen(port, function(err) {
    console.log("Server running on port 3000");
});