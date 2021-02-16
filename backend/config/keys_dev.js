const { DATABASE, HOST, DB_PORT, DB_USER, jwtPrivateKey } = process.env;

module.exports = {
  DBURI: `mysql://${DB_USER}@${HOST}:${DB_PORT}/${DATABASE}`,
  jwtPrivateKey: jwtPrivateKey,
};
