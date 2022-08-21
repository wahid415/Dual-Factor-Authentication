const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const WelcomeMailVerifyTemplate = (username, token) => {
  return `
    <h1>Welcome to the App <strong>${username}</strong></h1>
    <p>We would like you to verify your email by clicking on below <strong>Link</strong></p>
    <a href="http://localhost:5000/technical-test/verify-email/${token}">Verify Email</a>
    `;
};

const dualFactorVerifyTemplate = (dfaToken) => {
  return `
    <h1>Dual Factor Verification.</h1>
    <p>Please enter the code ${dfaToken} to verify your dual factor authentication step.</p>
  `;
};

exports.sendWelcomeEmail = (email, username, token, subject) => {
  sgMail
    .send({
      to: email,
      from: "shaguftarahman999@gmail.com",
      subject,
      // text: `Welcome to the app, ${username}. Let me know how you get along with the app.`,
      html: WelcomeMailVerifyTemplate(username, token),
    })
    .then((res) => {
      console.log("Email Sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.sendDfaVerificationEmail = (email, dfaToken) => {
  sgMail
    .send({
      to: email,
      from: "shaguftarahman999@gmail.com",
      subject: "Dual Fcator Verification",
      // text: `Welcome to the app, ${username}. Let me know how you get along with the app.`,
      html: dualFactorVerifyTemplate(dfaToken),
    })
    .then((res) => {
      console.log("Email Sent");
    })
    .catch((error) => {
      console.log(error);
    });
};
