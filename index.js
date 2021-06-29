const http = require('http');

//arbitrarily selected to run on localhost:3000
const PORT = 3000;

//creating a fresh server object
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/friends') {
        //provide a successfull response with a 200 message
        // res.writeHead(200, {
        //     'Content-Type': 'application/json'
        // });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        //Needs to be called on each request that comes into the server. It indicates that the response is now complete:
        res.end(JSON.stringify({
            id: 329384,
            name: 'Sir Isaac Newton',
        }));
    } else if (req.url === '/messages') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on Astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
    
});

//Tell the server to start listening for requests by passing the port:
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
});