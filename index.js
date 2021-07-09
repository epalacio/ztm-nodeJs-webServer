const http = require('http');

//arbitrarily selected to run on localhost:3000
const PORT = 3000;

//creating a fresh server object
const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla',
    },
    {
        id: 1,
        name: 'Sir Isaac Newton',
    },
];

server.on('request', (req, res) => {
    //split the url to find the /parameterized url
    const items = req.url.split('/');
    if(req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request:', friend);
            friends.push(JSON.parse(friend));
        })
    } else if (req.method === 'GET' && items[1] === 'friends') {
        //provide a successfull response with a 200 message
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]))
        } else {
            //Needs to be called on each request that comes into the server. It indicates that the response is now complete:
            res.end(JSON.stringify(friends));
        }
        
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
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