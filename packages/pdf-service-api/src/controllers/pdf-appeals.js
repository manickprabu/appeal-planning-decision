const { pipe, gotenberg, convert, html, please, set, scale, to } = require('gotenberg-js-client');
const fetch = require('node-fetch');
const appealTemplate = require('../templates/appeal');
const config = require('../lib/config');
const logger = require('../lib/logger');

module.exports = {
  async getPdf(req, res) {
    const appealId = req.params.id;
    logger.info(`generating pdf file for appeal with id ${appealId}`);
    let appeal = {};
    const appealUrl = `${config.appeals.url}/api/v1/appeals/${appealId}`;
    const appealResponse = await fetch(appealUrl);
    if (appealResponse.ok) {
      appeal = await appealResponse.json();
    } else {
      res.status(404).send(`An appeal with the specified ID was not found.`);
    }

    // Temporary solution pending update to Appeals API service to include full LPA name and time submitted ------------
    const { lpaCode } = appeal;
    logger.debug(`getting lpa for code ${lpaCode}...`);
    const lpaUrl = `${config.localPlanningAuthorities.url}/api/v1/local-planning-authorities/${lpaCode}`;
    const lpaResponse = await fetch(lpaUrl);
    appeal.lpaName = '';
    if (lpaResponse.ok) {
      const { name } = await lpaResponse.json();
      appeal.lpaName = name;
    }
    appeal.timeSubmitted = new Date().toISOString();
    // -----------------------------------------------------------------------------------------------------------------

    logger.debug(`appeal is...`);
    logger.debug(appeal);
    const appealHtml = appealTemplate(appeal);

    const toPDF = pipe(
      gotenberg(`${config.gotenberg.url}`),
      convert,
      html,
      set(scale(0.75)),
      to({
        marginTop: 0.2,
        marginBottom: 0.2,
        marginLeft: 0.2,
        marginRight: 0.2,
      }),
      please
    );
    const pdf = await toPDF(appealHtml);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${appealId}"`);
    pdf.pipe(res);
  },
};
