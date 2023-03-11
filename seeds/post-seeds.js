const { Post } = require('../models');

const postdata = [
    {
        title: 'Testing Title 1',
        post_text: 'We did not learn this in class',
        user_id: 1
    },
    {
        title: 'Testing 2',
        post_text: 'I wish we had learned this in class',
        user_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;