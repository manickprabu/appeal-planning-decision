const { pipe, gotenberg, convert, html, please, set, scale, to } = require('gotenberg-js-client');

const logger = require('../lib/logger');
const config = require('../lib/config');

module.exports = {
  async generatePdf(req, res) {
    logger.info('Generating pdf file from uploaded html file...');
    const { htmlFile } = req.files;
    const buffer = htmlFile.data;
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
    const pdf = await toPDF(buffer.toString());
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${htmlFile.name}.pdf"`);
    pdf.pipe(res);
  },
};
