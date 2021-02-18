const { Router } = require('express');
const pdf = require('./pdf');
const pdfAppeals = require('./pdf-appeals');
const apidocs = require('./api-docs');

const routes = Router();

routes.use('/api-docs', apidocs);
routes.use('/api/v1/pdf/appeals', pdfAppeals);
routes.use('/api/v1/pdf', pdf);

module.exports = routes;
