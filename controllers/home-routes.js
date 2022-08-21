//import express router/ db connection and models
const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

// get all posts for dashboard in a randomized order
router.get('/', (req, res) => {
    console.log(req.session)
        Post.findAll({
            order: [sequelize.fn('RAND')],
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
                const posts = dbPostData.map(post => post.get({
                    plain: true
                }));
                console.log(posts);
                res.render('homepage', {
                    posts,
                    loggedIn: req.session.loggedIn,
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
                res.redirect('/signup');
            });
});

//login route to display login page.  If loggedIn, redirects to home-page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

//login route to display signup page.  If loggedIn, redirects to home-pate
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
})

//gets a single post based off of id
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
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
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render(
                'single-post',
                {
                    post,
                    loggedIn: true
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//exports router
module.exports = router;