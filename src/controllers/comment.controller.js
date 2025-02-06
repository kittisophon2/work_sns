const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const { postId } = req.params;
  console.log(req.params);
  const { text, userId } = req.body; // Include userId
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } }, // Connect to the user
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: { user: true }, // Include user details
      orderBy: {
        createdAt: 'asc', // Order comments by creation time
      }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to get comments" });
  }
};


exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
      const comment = await prisma.comment.delete({
        where: { id: commentId },
      });
      res.status(204).end(); // 204 No Content for successful deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  };


