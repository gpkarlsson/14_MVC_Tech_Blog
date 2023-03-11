const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts with associated comments and user data
router.get('/', withAuth, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      attributes: ['id', 'title', 'post_text', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.json(postsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a specific post with associated comments and user data
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'post_text', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    });

    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: { id: req.params.id },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
