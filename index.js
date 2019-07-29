// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const postRoutes = require('./posts/postRoutes');
const path = require('path');

const db = require('./data/db.js')
// creates an express application using the express module
const server = express();
const cors = require('cors')

//middleware tk follow-along
function atGate(req, res, next) {
    console.log(`At the gate, about to be eaten`);
  
    next();
}
function auth(req, res, next) {
    if (req.url === '/mellon') {
      next();
    } else {
      res.send('You shall not pass!');
    }
}
function requestLogger(request, response, next) {
    console.log(`[${new Date()}] ${request.method} to ${request.url} from ${request.get('Origin')}`)
    next()
}
function balanceIsKey(request, response, next) {
    if (new Date().getSeconds() % 2 != 0) {
    response.status(403).json({message: "Balance is the key, making things even is the secret to success"})
    }
    else {
    next()
    }
}
//   function errorMessages(error, request, response, next) {

//   }

server.use(express.json());
server.use(atGate)
// server.use(balanceIsKey)
server.use(requestLogger)
server.use(cors())

//Routes 
server.use('/api/posts', postRoutes);

server.get('/mellon', auth, (req, res) => {
    console.log('Gate opening...');
    console.log('Inside and safe');
    res.send('Welcome Traveler!');
});

server.get('/download', (req, res, next) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, error => {
        if (error) {
            next(error)
        }
        else {
            console.log('File sent, success!')
        }
    });
});

server.use((error, request, response, next) => {
    console.error(error)
    response.status(500).json({message: 'There has been a terrible failure sending this file.' })
})

server.listen(7000, () => console.log('API running on port 7000'))
