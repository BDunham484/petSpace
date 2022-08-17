const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static like(body, models) {
        return models.Like.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    // 'post_text',
                    // 'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'),
                        'liked_count'
                    ]
                ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_image: {
            type: DataTypes.BLOB('long')
        },
        post_text: {
            type: DataTypes.STRING,
            // allowNull: true
        },
        pet_name: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [1]
            // }
        },
        pet_type: {
            type: DataTypes.STRING,
            // allowNull: false,

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;