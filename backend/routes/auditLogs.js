const express = require("express");
const router = express.Router();
const models = require("../models");
const responseService = require("../libs/responseService");
const logger = require("../libs/logger");
const auth = require("../middleware/auth");

router.get("/:entity_id", auth, async (req, res) => {
    try {
        let logs = await models.AuditLog.findAll({
        where: {entityId: req.params.entity_id},
        include: [{ model: models.User, attributes: ["id", "name"] }],
        order: [['createdAt', 'DESC']]
        });
      return responseService.sendResponse(res, { logs });
    } catch (ex) {
      logger.error(ex);
      return responseService.sendServerError(res);
    }
});

module.exports = router;