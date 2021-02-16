const express = require("express");
const router = express.Router();
const models = require("../models");
const responseService = require("../libs/responseService");
const logger = require("../libs/logger");
const auditLog = require("../libs/auditLog");
const auth = require("../middleware/auth");

router.put("/:id", auth, async (req, res) => {
  let form = await models.Form.findByPk(req.params.id);
  if (!form) {
    return responseService.sendBadRequest(res, "not found.");
  }
  try {
    let updatedForm = await models.Form.update(
      { name: req.body.name, 
        region: req.body.region,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,  },
      { where: { id: req.params.id } }
    );
    if(updatedForm) {
      let log_data = {
        userId: req.user.id,
        event: 'Updated',
        entity: "Form",
        entityId: form.id,
      }
      auditLog.createAuditLog(log_data)
    }
    return responseService.sendResponse(res, { updatedForm });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});


router.post("/", auth, async (req, res) => {
  const validateFormInput = require("../validation/form");
  const { errors, isValid } = validateFormInput(req.body);
  if (!isValid) return responseService.sendBadRequest(res, errors);
  let formObj = {
    name: req.body.name,
    region: req.body.region,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    createdBy: req.user.id
  };
  try {
    const form = await models.Form.create(formObj);
    if(form) {
      let log_data = {
        userId: req.user.id,
        event: 'Created',
        entity: "Form",
        entityId: form.id,
      }
      auditLog.createAuditLog(log_data)
    }
    return responseService.sendResponse(res, { form });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    form = await models.Form.findOne({
        where: { id: parseInt(req.params.id) }, 
    });
    let logs = await models.AuditLog.findAll({
      where: {entityId: req.params.id, entity: 'Form'},
      include: [{ model: models.User, attributes: ["id", "name"] }],
      order: [['createdAt', 'DESC']]
      });
    return responseService.sendResponse(res, { form, logs });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

router.get("/" , auth, async (req, res) => {
  try {
      let forms = await models.Form.findAll({
        order: [['createdAt', 'DESC']]
      });
    return responseService.sendResponse(res, { forms });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});


module.exports = router;
