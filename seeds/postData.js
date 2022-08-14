//import post mmodel
const { Post } = require('../models');

//array of data to populate posts
const postData = [
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Bob',
        pet_type: 'puggle',
        user_id: 1
    },
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Gladys',
        pet_type: 'mutt',
        user_id: 2
    },
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Dixie',
        pet_type: 'pit',
        user_id: 3
    },
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Deborah',
        pet_type: 'chihuahua',
        user_id: 1
    },
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Barb',
        pet_type: 'collie',
        user_id: 2
    },
    {
        post_image: "https://image.shutterstock.com/image-illustration/404-error-page-not-found-600w-308387615.jpg",
        post_text: 'dogs dogs dogs',
        pet_name: 'Larry',
        pet_type: 'basset hound',
        user_id: 3
    },


]

//function to bulk create the post data array
const seedPost = () => Post.bulkCreate(postData);

//export function to index.js
module.exports = seedPost;