const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Op } = require('sequelize');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
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
});

router.get('edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: User,
                },
                User,
            ],
        });

        if (!dbPostData) {
            res.status(404).end();
            return;
        }
        const post = dbPostData.toJSON();
        
        res.render('edit-post', {
            post,
            loggedIn: true,
            username: req.session.username,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports(router);