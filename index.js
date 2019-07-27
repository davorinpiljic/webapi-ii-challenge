// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js')
// creates an express application using the express module
const server = express();
const cors = require('cors')

server.use(express.json());
server.use(cors())

server.get('/api/posts', (request, response) => {
    db.find()
    .then(post => {
        if(post) {
        response.status(200).json(post)
        }
    })
    .catch(error => {
        response.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (request, response) => {
    const {id} = request.params

    db.findById(id)
    .then(post => {
        if(post) {
        response.status(200).json(post)
        }
        else {
        response.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        response.status(500).json({error: "The post information could not be retrieved."})
    })
})

server.get('/api/posts/:id/comments', (request, response) => {
    const {id} = request.params

    db.findPostComments(id)
    .then(comments => {
        if(comments) {
        response.status(200).json(comments)
        }
        else {
        response.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        response.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

server.post('/api/posts', (request, response) => {
    const newPost = request.body
    console.log(newPost)
    if (!newPost.title || !newPost.contents) {
        request.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert(newPost)
    .then(post => {
        if(post) {
        response.status(201).json(post)
        }
    })
    .catch(error => {
        response.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

server.delete('/api/posts/:id', (request, response) => {
    const {id} = request.params

    db.remove(id)
    .then(post => {
        if(post) {
        response.status(200).json({message: "The post has been deleted"})
        }
        else {
        response.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        response.status(500).json({ error: "The post could not be removed" })
    })
})

server.put('/api/posts/:id', (request, response) => {
    const {id} = request.params
    const postBody = request.body
    if (!postBody.title || !postBody.contents) {
        response.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(id, postBody) 
    .then(post => {
        if(post) {
        response.status(200).json(post)
        }
        else {
        response.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        response.status(500).json({error: "The post information could not be modified."})
    })
})

server.listen(7000, () => console.log('API running on port 7000'))
