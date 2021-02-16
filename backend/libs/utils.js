
let Utils = {
  clone: function (copyobj) {
    return Object.assign({}, copyobj);
  },

  /**
   * get a nested property without getting an undefined error, when
   * a referenced object does not exist.
   *
   * @param obj $obj - object to use
   * @param key $key - path to find value
   * @param defaultReturn - what to return when not found
   * @example
   * let obj = {a: {b: 'c'}};
   * utils.get(obj,'a.d'); // undefined
   * utils.get(obj,'a.b'); // 'c'
   */
  get: function (obj, key, defaultReturn = null) {
    const res = key.split(".").reduce((returnVal, currentKey) => {
      return returnVal ? returnVal[currentKey] : defaultReturn;
    }, obj);

    return res ? res : null;
  },

  /**
   * test if a variable is an object (and not an array).
   *
   * @param val $obj - object to use
   */
  isObject: function (val) {
    return !!val && typeof val === "object" && !Array.isArray(val);
  },

  /**
   * make a copy of an object with the least amount
   * of side effects. Does not copy object methods.
   *
   * @param obj object - object to use
   * @example
   * const obj = {a:'b'};
   * const copy = utils.copyObject(obj); // returns detached duplicate
   */
  copyObject: function (obj) {
    if (!this.isObject(obj)) return;

    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * capitalize the first letter of each word.
   *
   * @param {Number} str
   */
  titleCase(str) {
    return str
      .split(" ")
      .map((_) => `${_[0].toUpperCase()}${_.slice(1).toLowerCase()}`)
      .join(" ");
  },

  /**
   * find a param in the request
   *
   * @param {Object} req
   * @param {String} key
   */
  getRequestParam(req, key) {
    return this.get(req, `query.${key}`);
  },

  /**
   * combine two objects
   *
   * @param {Object} obj1
   * @param {Object} obj2
   */
  mergeObjects(obj1, obj2) {
    return Object.assign(obj1, obj2);
  },

  /**
   * check if param is a string
   *
   * @param {Object} s value to be tested
   */
  isString(s) {
    return typeof s === "string" || s instanceof String;
  },

  /**
   * get the pagination values from the request
   *
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @param {Integer} def default per page value
   */
  getPaginationValues(req, res, def = 1000000) {
    let limit = +this.get(req, "query.limit") || def;
    let page = +this.get(req, "query.page") || 1;

    if (page < 1) page = 1;
    let offset = (page - 1) * limit;
    return { limit, offset };
  },

  isEmpty(val) {
    return val === undefined || val === null || val.toString().length === 0;
  },

  getRandomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  getRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getTtl(minutes) {
    return minutes * 60 * 1000;
  },
  
};

module.exports = Utils;
