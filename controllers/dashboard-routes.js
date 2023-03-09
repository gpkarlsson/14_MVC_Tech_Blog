const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.id,
            },
            include: [
                {
                    model: Comment,
                    include: User,
                },
                User,
            ],
            order: [['created_at', 'DESC']],
        });
        const posts = dbPostData.map(post => post.toJSON());

        res.render('dashboard', {
            posts,
            loggedIn: true,
            username: req.session.username,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    //left off here

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id',],
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
    })
    .then()
})