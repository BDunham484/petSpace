//import exress router
const router = require('express').Router();
//import sequelize db connection
const sequelize = require('../../config/connection');
//import models
const { Post, User, Like, Comment } = require('../../models');
//iport suthorization function
const withAuth = require('../../utils/auth');

//GET /api/posts
router.get('/', (req, res) => {
  //access Post model and .findAll() methox
  Post.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//GET api/posts/id
router.get('/:id', (req, res) => {
  //acciess Post model and run .findOne() method
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
        res.status(404).json({ message: 'No post found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//POST api/posts/newPost
router.post('/newPost', (req, res) => {
  console.log('req.files!!!!!!!!!!!!!!!!!!!!!');
  console.log(req.files);
  //takes user-image/file-input for new posts
  //validation
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let post_image = req.files.post_image;
  //convert buffer data into readable format for front-end
  let b64 = Buffer.from(post_image.data).toString('base64');
  let mimeType = 'image/png';
  let hope = `data:${mimeType};base64,${b64}`
  //access POST model to run .crete() method
  Post.create({
    user_id: req.session.user_id,
    post_image: hope,
    post_text: "",
    pet_name: "",
    pet_type: "",
    created_at: req.body.created_at,
  })
    .then(dbPostData => {
      console.log('newPost   dbPostData!!!!!!!!!!!!!')
      console.log(dbPostData);
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

//PUT api/posts/newPost/id
router.put('/newPost/:id', (req, res) => {
  console.log('PUT!!!!!!!!!!!!REQ.BODY!!!!!!!!!!');
  console.log(req.body)
  //access POST model to run .update method
  //updates post with image/file created above w/ user-input text data
  Post.update(
    {
      post_text: req.body.post_text,
      pet_name: req.body.pet_name,
      pet_type: req.body.pet_type,
      created_at: req.body.created_at,
    },
    {
      where: {
        id: req.params.id
      }
    },

  )
    .then(dbPostData => {
      console.log('newPost UPDATE dbPostData!!!!!!!!!!!!!')
      console.log(dbPostData);
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//PUT api/posts/like
router.put('/like', (req, res) => {
  //'likes' a post
  //make sure session exists
  if (req.session) {
    Post.like({ ...req.body, user_id: req.session.user_id }, { Like, Comment, User })
      .then(updatedLikeData => res.json(updatedLikeData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  } else {
    alert("You must be signed in to interact with posts.")
  }

})

//PUT api/posts/id
router.put('/:id', withAuth, (req, res) => {
  //access POST model to run .update() method
  //edits posts
  Post.update(
    {
      pet_name: req.body.pet_name,
      pet_type: req.body.pet_type,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return;
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//DELETE api/posts/id
router.delete('/:id', withAuth, (req, res) => {
  //access POST model to run .destroy method.
  //deletes posts
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return;
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//exports router
module.exports = router
