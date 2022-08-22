const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard and display in descending order based on creation date
router.get('/', (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [['created_at', 'DESC']], 
            attributes: [
                'id',
                'user_id',
                'post_image',
                'post_text',
                'pet_name',
                'pet_type',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'liked_count']
            ],
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
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('dashboard', {
                posts,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err);
            // res.status(500).json(err);
            res.redirect('/signup');
            
        });
});

//route to find a post based on Id for editing
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'user_id',
                'post_image',
                'post_text',
                'pet_name',
                'pet_type',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'liked_count']
            ],
            include: [{
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
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }
            const post = dbPostData.get({
                plain: true
            });
            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//exports router
module.exports = router;