"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Form = sequelize.define(
    "Form",
    {
      name: { type: Sequelize.STRING, allowNull: false },
      region: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      latitude: { type: Sequelize.STRING, allowNull: false },
      longitude: { type: Sequelize.STRING, allowNull: false },
      createdBy: { type: Sequelize.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "forms",
    }
  );

  return Form;
};
