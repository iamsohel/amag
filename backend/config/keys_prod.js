const {
  DATABASE,
  HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  jwtPrivateKey,
} = process.env;

module.exports = {
  DBURI: `mysql://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`,
  jwtPrivateKey: jwtPrivateKey,
};
