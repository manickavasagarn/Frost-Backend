// const { connection } = require('../src/common/connection');
const nodemailer = require('nodemailer');
const sendMail = (toMail,message) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "manickavasagardgl@gmail.com",
          pass: "cpft epwj nulg tpsy", // Use the generated App Password here
        },
      });
      transporter.sendMail(
        {
          from: process.env.ADMIN_MAIL,
          to: toMail,
          subject: `L2 - Interview task`,
          html: `<html>
                                              <head>
                                                  <meta charset="UTF-8">
                                                  <title>L2 - Interview task</title>
                                              </head>
                                              <body style="text-align: center;">
                                                  <div class="container" style="margin-top:10vh">
                                                     <div style="background-color: #172D55;"> <img decoding="async" width="400" height="23" src="https://www.frost.com/wp-content/uploads/2019/01/frostsullivanlogo.png" alt="Frost &amp; Sullivan Logo" srcset="https://www.frost.com/wp-content/uploads/2019/01/frostsullivanlogo.png 400w, https://www.frost.com/wp-content/uploads/2019/01/frostsullivanlogo-300x17.png 300w" sizes="(max-width: 400px) 100vw, 400px" class=""></div>
                                                      ${message}
                                                  </div>
                                              </body>
                                          </html>`,
        },
        function (error, info) {
          if (error) console.log(error);
          resolve(true);
        }
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  sendMail,
};
