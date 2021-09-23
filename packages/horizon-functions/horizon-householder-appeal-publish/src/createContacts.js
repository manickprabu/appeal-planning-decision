const createContact = require('./logic/createContact');

/**
 * Create Contacts
 *
 * Takes the body data, parses it into agent/appellant, creates the
 * contact inside Horizon and returns the data that is in the format
 * that can be used by the CreateCase endpoint.
 *
 * @param {*} log
 * @param {*} body
 * @returns {Promise}
 */
const createContacts = async (log, body) => {
  const contacts = [];
  let logMessage;

  if (body.appeal.aboutYouSection.yourDetails.isOriginalApplicant) {
    /* User is original applicant - just add appellant */
    logMessage = 'User is original applicant';
    contacts.push({
      type: 'Appellant',
      email: body.appeal.aboutYouSection.yourDetails.email,
      name: body.appeal.aboutYouSection.yourDetails.name,
    });
  } else {
    /* User is agent - add both agent and OP */
    logMessage = 'User is agent';
    contacts.push(
      {
        type: 'Agent',
        email: body.appeal.aboutYouSection.yourDetails.email,
        name: body.appeal.aboutYouSection.yourDetails.name,
      },
      {
        /* Email not collected here */
        type: 'Appellant',
        name: body.appeal.aboutYouSection.yourDetails.appealingOnBehalfOf,
      }
    );
  }

  log(contacts, logMessage);

  return Promise.all(
    contacts.map(async ({ name, email, type }) => {
      /* Create the user in Horizon */
      const [firstName, ...lastName] = name.split(' ');
      let contactId;

      log('Inserting contact into Horizon');

      const contactId = await createContact(log, {
        firstName,
        lastName: lastName.join(' '), // Treat multiple spaces as part of last name
        email,
      });

      return {
        /* Add user contact details */
        key: 'Case Involvement:Case Involvement',
        value: [
          {
            key: 'Case Involvement:Case Involvement:ContactID',
            value: contactId,
          },
          {
            key: 'Case Involvement:Case Involvement:Contact Details',
            value: name,
          },
          {
            key: 'Case Involvement:Case Involvement:Involvement Start Date',
            value: new Date(),
          },
          {
            key: 'Case Involvement:Case Involvement:Communication Preference',
            value: 'e-mail',
          },
          {
            key: 'Case Involvement:Case Involvement:Type Of Involvement',
            value: type,
          },
        ],
      };
    })
  );
};

module.exports = { createContacts };
