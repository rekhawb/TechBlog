const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blogcomment extends Model { }

Blogcomment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   
    blog_comment:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    blog_comment_dt:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      defaultValue:DataTypes.NOW,

    },blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'blog_id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      }
    },

  },




  {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogcomment',
  }
);

module.exports = Blogcomment;
