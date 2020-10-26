'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Rating = sequelize.define('User_Rating', {
    User_Rating_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Rating_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {

    timestamps: false,
    tableName: 'User_Rating',    
    freezeTableName: true

  });
  User_Rating.associate = function(models) {
    // associations can be defined here

    User_Rating.hasOne(models.Sys_Rating , {
      foreignKey: {
        name: 'Rating_Id',
        targetKey: 'Rating_Id'
      },
      as: 'Sys_Rating'
    });
  };
  return User_Rating;
};