const formData = require('form-data');
const Mailgun = require('mailgun.js');
import { getBasicLinkTemplate } from './templates/basicLink';

class EmailSender {
  constructor() {
    this.mailgunApiKey = process.env.MAILGUN_API_KEY;
    this.mailgunDomain = process.env.MAILGUN_DOMAIN;
  }

  getHTML(templateType, data) {
    switch (templateType) {
      case 'basicLink':
        return getBasicLinkTemplate(data);
        break;
      default:
        console.log(`Invalid HTML type: ${templateType}`);
        throw new Error(`Invalid HTML type: ${templateType}`);
    }
  }

  sendEmail(recipient, subject, text, html) {
    if (!recipient || !subject || !text || html === null) {
      console.log(recipient, subject, text, html);
      let missing = [];
      switch (false) {
        case !!recipient:
          missing.push("recipient");
        case !!subject:
          missing.push("subject");
        case !!text:
          missing.push("text");
        default:
          break;
      }

      throw new Error(`Missing required fields: ${missing.join(", ")}`);
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: this.mailgunApiKey,
        });

    const mailData = {
      from: 'Russell Young Archives <noreply@automate.russellyoungarchives.com>',
      to: [recipient],
      subject: subject,
      text: text,
      html: html
    };

    mg.messages.create(this.mailgunDomain, mailData)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  return true

  }

}

module.exports = EmailSender;
