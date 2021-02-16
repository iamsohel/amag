
const models = require("../models");
const logger = require("../libs/logger");

let auditLog = {
    async createAuditLog(data) {
        let logObj = {
            userId: data.userId,
            event: data.event,
            entity: data.entity,
            entityId: data.entityId,
          };
          try {
            const form = await models.AuditLog.create(logObj);
          } catch(ex){
            logger.error(ex);
          }
    }
}

module.exports = auditLog;
