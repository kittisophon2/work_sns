const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.post('/:postId/comments', commentController.createComment); 
router.get('/:postId/comments', commentController.getCommentsByPost);

module.exports = router;
