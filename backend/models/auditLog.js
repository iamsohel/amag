"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const AuditLog = sequelize.define(
    "AuditLog",
    {
      userId: { type: Sequelize.INTEGER, allowNull: false },
      dateTime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      event: { type: Sequelize.STRING, allowNull: false },
      entity:{ type: Sequelize.STRING, allowNull: false },
      entityId: { type: Sequelize.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "audit_logs",
    }
  );

  AuditLog.associate = function (models) {
    AuditLog.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return AuditLog;
};
