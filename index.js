// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const postRoutes = require('./posts/postRoutes');

const db = require('./data/db.js')
// creates an express application using the express module
const server = express();
const cors = require('cors')

server.use(express.json());
server.use(cors())

server.use('/api/posts', postRoutes);

server.listen(7000, () => console.log('API running on port 7000'))
