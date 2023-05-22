const express = require('express');
const { responseUtility } = require('../common/utils/responseUtility');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(responseUtility);
  app.use(helmet());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
  app.use(cors());
};
