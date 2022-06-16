const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const dateValidationRegex = /\d{4}-\d{2}-\d{2}/ ;

class Blogpost extends Model {}

Blogpost.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      
      blog_dt: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        defaultValue: DataTypes.NOW,
    },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
   
  },
  {
   
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

module.exports = Blogpost;
