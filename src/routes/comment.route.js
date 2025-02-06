const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// POST /posts/:postId/comments
router.post('/', commentController.createComment);

// GET /posts/:postId/comments
router.get('/', commentController.getCommentsByPost);

// DELETE /comments/:commentId 
router.delete('/:commentId', commentController.deleteComment); 

module.exports = router;