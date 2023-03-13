const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const express  = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

class Post extends Model {}
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
            content: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            author_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
            },
        },
    },
    {
        sequelize, 
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    },
);
module.exports = Post;