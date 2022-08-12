const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Post, User, Like, Comment } = require('../../models')

router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', sequelize.fn('RAND')]],
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = like.post_id)'), 'like_count']
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

router.post('/', (req, res) => {
  Post.create({
    user_id: req.session.user_id,
    post_image: req.body.post_image,
    post_text: req.body.post_text,
    pet_name: req.body.pet_name,
    pet_type: req.body.pet_type,
    // created_at: req.body.created_at
    
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put('/upvote', (req, res) => {
  Post.upvote(req.body, { Vote })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
})

router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
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

router.delete('/:id', (req, res) => {
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
