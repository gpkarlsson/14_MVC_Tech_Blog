// Import Model and DataTypes classes as well as sequelize package

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Import bcrypt module for hashing user password


class User extends Model {
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

// Define model attributes and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        // Hash user password using bcrypt
        await user.hashPassword();
      },
      async beforeUpdate(user) {
        if (user.changed('password')) {
          await user.hashPassword();
        }
      }
    },
    sequelize: sequelize,
    modelName: 'user',
    freezeTableName: true,
    underscored: true,
  }, 
)

module.exports = User;