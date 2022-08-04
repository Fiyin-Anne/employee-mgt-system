'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: { allowNull: false, name: 'userId'}});
    }

    static calculate(baseSalary) {
      //return salary including VAT, Pension, e.t.c
    }
  }
  Salary.init({
    monthly: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yearly: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Salary',
  });
  return Salary;
};