require("dotenv").config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD_CR,
  database: process.env.DB_NAME,
  dialect: process.env.DIALECT,
};

module.exports = { dbConfig };
