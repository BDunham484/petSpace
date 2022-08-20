const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Like, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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


router.post('/newPost', (req, res) => {
  console.log('req.files!!!!!!!!!!!!!!!!!!!!!');
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let post_image = req.files.post_image;

  let b64 = Buffer.from(post_image.data).toString('base64');
  let mimeType = 'image/png';
  let hope = `data:${mimeType};base64,${b64}`

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

router.put('/newPost/:id', (req, res) => {
  console.log('PUT!!!!!!!!!!!!REQ.BODY!!!!!!!!!!');
  console.log(req.body)
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


router.put('/like', (req, res) => {
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

router.put('/:id', withAuth, (req, res) => {
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

router.delete('/:id', withAuth, (req, res) => {
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

module.exports = router
