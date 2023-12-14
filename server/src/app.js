const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const config = require('./config/config');
const v1Router = require('./routes');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.set('debug', true);
(async function () {
  try {
    await mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}`, {
      dbName: config.db.database,
    });
    console.log('Mongo DB is running');
  } catch (error) {
    console.log(error);
  }
})();

app.use(
  cors({
    origin: ['http://121.130.44.227:2480', 'http://srulab.iptime.org:3002', 'http://localhost:3002', 'http://localhost:4002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    key: 'petimage-key',
    resave: false,
    saveUninitialized: false,
    secret: 'petimage',
    cookie: {
      httpOnly: true,
      secure: false,
      // maxAge: 60 * 1000,
    },
  })
);
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use('/pet', express.static('pet'));

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Petimage API',
      description: '테스트용 access token(만료기간 x)은 "admin"으로 입력하시면 됩니다.',
    },
    servers: [
      {
        url: 'http://srulab.iptime.org:4002',
      },
      {
        url: 'http://localhost:4002',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/routes/**/*.js'],
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/v1', v1Router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};
  res.status(err.status || 500);
  res.send(err.message);
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port ${config.port} 🛡️
    ################################################
  `);
  })
  .on('error', (err) => {
    console.error(err);
  });
