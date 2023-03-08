// Create instance of express.Router()
const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const sequelize = require('../config/connection');

// GET route for root URL 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'post_text', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const serializedPosts = posts.map(post => post.get({ plain: true }))
        res.render('homepage', {
            posts: serializedPosts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

//GET route for login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
    } else {
        res.render('login')
    }
});

// GET route for a single post
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'post_text', 'title', 'created_at'],
            include: [
                {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!post) {
            res.status(404).json({ error: 'No post found' })
        } else {
            const serializedPost = post.get({ plain: true });
            
            res.render('single-post', {
                post: serializedPost,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to retrieve post'});
    }
});

module.exports = router;