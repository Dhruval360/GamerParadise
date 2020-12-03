const fs = require("fs");           
// Reading the required client files into memory
var index = fs.readFileSync(__dirname + "/client.html");
var backgroundImg = fs.readFileSync(__dirname + "/../media/background.png");
var userPaddleImg = fs.readFileSync(__dirname + "/../media/userPaddle.png");
var enemyPaddleImg = fs.readFileSync(__dirname + "/../media/enemyPaddle.png");
var puckImg = fs.readFileSync(__dirname + "/../media/puck.png");

// Determines how to route users - only GET requests are accepted for now
var router = (request, response) => {
    // If they ask for the root, prepare and write the index page to the header
    switch (request.url) {
        case '/':
            response.writeHead(200, {"Content-Type": "text/html"});	
            response.write(index);
            break;
        case '/favicon.ico':
            break;
        case '/media/background.png':
            response.writeHead(200, {"Content-Type": "image/gif"});
            response.write(backgroundImg);
            break;
        case '/media/userPaddle.png':
            response.writeHead(200, {"Content-Type": "image/gif"});
            response.write(userPaddleImg);
            break;
        case '/media/enemyPaddle.png':
            response.writeHead(200, {"Content-Type": "image/gif"});
            response.write(enemyPaddleImg);
            break;
        case '/media/puck.png':
            response.writeHead(200, {"Content-Type": "image/gif"});
            response.write(puckImg);
            break;
    }
    response.end(); // Close the response stream
};

module.exports = router;