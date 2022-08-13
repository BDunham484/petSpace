//require express router
const router = require('express').Router();
//import comment model
const { Comment } = require('../../models');
//import authorization function
const withAuth = require('../../utils/auth');

//GET api/comments
router.get('/', (req, res) => {
    //access comment model and run .findAll() method
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//POST api/comments
router.post('/', (req, res) => {
    console.log(req.session)
    // check the session
    if (req.session) {
        //if session access comment model and run .create() method
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.body.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//DELETE api/comments/1
router.delete('/:id', (req, res) => {
    //access comment model and run destroy() method
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//exports routes
module.exports = router;