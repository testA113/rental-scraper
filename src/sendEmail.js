// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from "@sendgrid/mail";

const propertyListToHtml = (newPropertyItems, propertyPlural) => {
  const baseUrl = "https://www.openrent.co.uk/";
  const message = `<p>Hey bro, new ${propertyPlural} found:</p>`;
  const htmlForIdsItems = newPropertyItems
    .map(({ id, title }) => {
      const propertyUrl = `${baseUrl}${id}`;
      return `<li><a href="${propertyUrl}">${title}</a></li>`;
    })
    .join("");
  return `<div>${message}<ul>${htmlForIdsItems}</ul></div>`;
};

export const sendEmail = (newPropertyItems) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const propertyPlural = newPropertyItems.length <= 1 ? "rental" : "rentals";
  const html = propertyListToHtml(newPropertyItems, propertyPlural);
  const emails = JSON.parse(process.env.SENDGRID_TO_EMAILS);

  emails.forEach((email) => {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "New properties found",
      text: "and easy to do anywhere, even with Node.js",
      html,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
