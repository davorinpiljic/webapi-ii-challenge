const express = require('express')
const router = express.Router()

const db = require('../data/db.js')

// this file will only be used when the route begins with "/api/posts"
router.get('/', (request, response) => {
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

router.get('/:id', (request, response) => {
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

router.get('/:id/comments', (request, response) => {
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

router.post('/', (request, response) => {
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

router.post('/:id/comments', (request, response) => {
    const comment = request.body
    if (!comment.text) {
        response.status(404).json({ errorMessage: "Please provide text for the comment." })
    }
    db.insertComment(request.body)
    .then(post => {
        if(post) {
        response.status(201).json(post)
        }
        else {
        response.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        response.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

router.delete('/:id', (request, response) => {
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

router.put('/:id', (request, response) => {
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

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router