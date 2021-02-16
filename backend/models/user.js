"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      email: { type: Sequelize.STRING, allowNull: false },
      password:{ type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.AuditLog, {
      foreignKey: "userId",
    });
  };

  return User;
};
