'use strict';
const { Model } = require('sequelize');
const PasswordHash = require('../../utils/passwordHash');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      this.hasMany(models.Timeoff, {foreignKey: { allowNull: false, name: 'userId'}});
      this.hasMany(models.Request, {foreignKey: { allowNull: false, name: 'userId'}});
      this.hasOne(models.Salary, {foreignKey: { allowNull: false, name: 'userId'}});
      this.belongsTo(models.Department, {foreignKey: {allowNull: false, name: 'departmentId' }})

    }

    static matchPassword = (password, passwordhash) => {
      return new PasswordHash(password, passwordhash).isMatch();
    };

    static hashPassword = (password) => {
      return new PasswordHash(password).hashPassword();
    };

  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accesstk: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};