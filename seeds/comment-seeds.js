const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'Testing',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Also testing',
        user_id: 2,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;