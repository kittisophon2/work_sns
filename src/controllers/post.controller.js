const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, authorId } = req.body; // Include authorId
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId, // Associate with author
    },
  });
  res.json(result);
};

// Get all posts
exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { 
      author: true, 
      comments: { 
        include: { 
          user: true 
        }, 
      }, 
    }, // Include author details
  });
  res.json(posts);
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: { 
      author: true, 
      comments: { 
        include: { 
          user: true 
        }, 
      }, 
    }, // Include author details
  });
  res.json(post);
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const result = await prisma.post.update({
    where: { id: id },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.json(result);
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: { id: id },
  });
  res.json(post);
};
