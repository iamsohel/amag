const winston = require("winston");
const moment = require("moment");

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf((info) => {
  return `${moment(info.timestamp).format("L LTS")} : ${info.level}: ${
    info.message
  }`;
});

/*
 * Winston factory for creating a winston instance. Which is
 * used for logging. By default it only logs to console.
 *
 * @desc create config object
 * @return object - Config instance
 */
const logger = winston.createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({ level: "info" }),
  ],
});

module.exports = {
  stringify(arr) {
    if (arr.length === 1) {
      let res;
      try {
        res =
          arr[0] instanceof Object ? JSON.stringify(arr[0], null, 2) : arr[0];
      } catch (e) {
        logger.warn("unable to stringify for logging", _, e);
        return arr[0];
      }
      return res;
    }

    return arr.map((_) => {
      let res;
      try {
        res = JSON.stringify(_);
      } catch (e) {
        logger.warn("unable to stringify for logging", _, e);
        return _;
      }
      return res;
    });
  },
  log(...args) {
    logger.log("info", this.stringify(args));
  },
  info(...args) {
    logger.info(this.stringify(args));
  },
  warn(...args) {
    logger.warn(args);
  },
  error(...args) {
    logger.error(args);
  },
  debug(...args) {
    logger.debug(this.stringify(args));
  },
};
