const nodemailer = require("nodemailer");
let transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "devken43@gmail.com",
    pass: "8C99A3A5BBF913C393BCCBDAE759D89CE91F",
  },
});

const mailOptions = {
  from: "devken43@gmail.com", // Sender address
  to: "devilken43@gmail.com", // List of recipients
  subject: "Node Mailer", // Subject line
  text: "Hello People!, Welcome to Bacancy!", // Plain text body
};

transport.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
