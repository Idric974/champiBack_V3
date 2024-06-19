require('dotenv').config();

const dataBaseConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD_CR,
  database: process.env.DB_NAME,
};

module.exports = dataBaseConfig;

