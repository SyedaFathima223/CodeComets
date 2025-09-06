// Minimal sendEmail utility. Replace with nodemailer/SendGrid in prod.
const sendEmail = async ({ to, subject, text, html }) => {
  console.log('--- sendEmail stub ---');
  console.log('to:', to);
  console.log('subject:', subject);
  console.log('text:', text);
  // In production: implement nodemailer or external provider
  return true;
};

module.exports = sendEmail;
