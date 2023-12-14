const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  port: process.env.PORT,
  fileUrl: process.env.FILE_URL,
  petUrl: process.env.PET_URL,
  accSecret: process.env.ACCESS_SECRET,
  refSecret: process.env.REFRESH_SECRET,
  aiServer: process.env.AI_SERVER,
  aiToken: process.env.AI_TOKEN,
};

// const db = {
//   dialect: 'mysql',
//   host : process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE,
// };

// const development = {
//   dialect: 'mysql',
//   host : process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE,
// };

// const test = {
//   dialect: 'mysql',
//   host : process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE
// };

// const production = {
//   dialect: 'mysql',
//   host : process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username : process.env.DB_USER,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE
// };

// module.exports = { development, production, test, db }
