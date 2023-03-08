// Importing all models
const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');

// Creating associations
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

module.exports = { 
    User, 
    Post, 
    Comment
 };