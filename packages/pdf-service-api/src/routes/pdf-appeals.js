const { Router } = require('express');
const pdfAppealsController = require('../controllers/pdf-appeals');

const routes = new Router();

routes.get('/:id', pdfAppealsController.getPdf);

module.exports = routes;
