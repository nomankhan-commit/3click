'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    
    User_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    User_Parent_Id: DataTypes.INTEGER,
    Signup_Date: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'User',    
    freezeTableName: true

  });

  User.associate = function(models) {
    // associations can be defined here
  
    User.hasOne(models.Sec_User_Role , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'Sec_User_Role'
    });

    User.hasMany(models.User_Document , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Document'
    });

    User.hasOne(models.User_Document , {
      foreignKey: 'User_Id', 
      sourceKey: 'User_Id',
      as: 'profile_image'
    });

    User.hasOne(models.User_Profile , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Profile'
    });

    User.hasMany(models.User_Contact , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Contact'
    });

    User.hasMany(models.User_Notification , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Notification'
    });
    User.hasMany(models.Rms_Request , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'Rms_Request'
    });
    User.hasMany(models.User_Rating , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Rating'
    });


    User.hasOne(models.User_Custom_Info , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Custom_Info'
    });

    
    User.hasOne(models.User_Custom_Info , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Description'
    });

    User.hasOne(models.User_Custom_Info , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Vehicle_Register'
    });


    User.hasOne(models.User_Custom_Info , {
      foreignKey: {
        name: 'User_Id',
        targetKey: 'User_Id'
      },
      as: 'User_Device_Id'
    });

  };

  
  
  
  
  return User;
};