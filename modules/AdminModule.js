const { connection, cryptr } = require("../connection");
const moment = require("moment");
const { sendMail } = require("../services/Mail");
const { v4: uuidv4 } = require("uuid");
exports.users = async (req, res) => {
  connection.query(
    "SELECT a.*,b.* FROM user_info as a join credentials as b on a.USER_ID=b.ID ",
    function (error, results, fields) {
      if (error) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        if (results?.length > 0) {
          let sendData = results;
          sendData?.map((ele, index) => {
            delete sendData[index].PASSWORD;
          });
          delete sendData.PASSWORD;
          res.status(200).send(sendData);
        } else res.status(400).json({ message: "User not found" });
      }
    }
  );
};

exports.waitingUpdate = async (req, res) => {
  connection.query(
    "SELECT a.id AS update_id,a.*,b.* FROM update_table as a join credentials as b on a.USER_ID=b.ID ",
    function (error, results, fields) {
      if (error) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        if (results?.length > 0) {
          let sendData = results;
          sendData?.map((ele, index) => {
            delete sendData[index].PASSWORD;
          });
          delete sendData.PASSWORD;
          res.status(200).send(sendData);
        } else res.status(400).json({ message: "User not found" });
      }
    }
  );
};

exports.acceptUpdate = async (req, res) => {
  connection.query(
    "SELECT a.*,b.MAIL FROM update_table as a join credentials as b on a.USER_ID=b.ID where a.ID = ?;",
    [req.body.ID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      } else {
        console.log(results[0]);
        connection.query(
          "UPDATE `user_info` SET `FIRST_NAME` = ?,`LAST_NAME` = ?,`PHONE_NUMBER` = ?,`ADDRESS` = ?,`DOB` = ?,`GENDER` = ? WHERE `USER_ID` = ?;",
          [
            results[0].FIRST_NAME,
            results[0].LAST_NAME,
            results[0].PHONE_NUMBER,
            results[0].ADDRESS,
            results[0].DOB,
            results[0].GENDER,
            results[0].USER_ID,
          ],
          async function (error, resultsTwo, fields) {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Something went wrong" });
            } else {
              let messageContent = `<h2 style="font-weight: 700;color: black;font-family:'Quicksand', sans-serif;margin-top: 6px;">Your update request has been accepted by the administrator. Thank you for your submission.</h2>`;
              await sendMail(results[0].MAIL, messageContent);
              connection.query(
                "DELETE FROM `update_table` WHERE ID = ?;",
                [req.body.ID],
                function (error, resultsThree, fields) {
                  if (error) {
                    console.log(error);
                    res.status(500).json({ message: "Something went wrong" });
                  } else {
                    res.status(400).json({ message: "Update Accepted" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

function generatePassword(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!@#$%^&*()_+-=[]{}|;:,.<>/";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

exports.userCreation = async (req, res) => {
  const { username, firstname, lastname, mail, number, address, dob, gender } =
    req.body;
  var password = generatePassword(10);
  connection.query(
    "SELECT * FROM `credentials` WHERE MAIL = ? or USERNAME = ?",
    [mail, username],
    async function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      } else {
        if (results.length > 0) {
          if (results[0]?.MAIL == mail)
            res.status(409).json({ message: "Mail Already Registered" });
          else if (results[0]?.USERNAME == username)
            res.status(409).json({ message: "Username already taken" });
        } else {
          const code = uuidv4();
          const encryptedPassword = cryptr.encrypt(password);
          const createdDt = moment(new Date()).format("YYYY-MM-DD");
          connection.query(
            "INSERT INTO `credentials` (`ID`,`USERNAME`,`MAIL`, `PASSWORD`, `STATUS`,`IS_ADMIN`, `RESET_REQUIRED`, `ROLE`,`CREATED_DATE`) VALUES (?, ?, ?, ?, 'Active', 'No', 'No', 'User', ?) ",
            [code, username, mail, encryptedPassword, createdDt],
            function (error, results, fields) {
              if (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
              } else {
                connection.query(
                  "INSERT INTO `user_info` (`USER_ID`,`FIRST_NAME`, `LAST_NAME`,`PHONE_NUMBER`,`ADDRESS`,`DOB`,`GENDER`) VALUES (?, ?, ?, ?, ?, ?, ?) ",
                  [code, firstname, lastname, number, address, dob, gender],
                  async function (error, results, fields) {
                    if (error) {
                      console.log(error);
                      res.status(500).json({ message: "Something went wrong" });
                    } else {
                      let messageContent = `<h6 style="margin-top: 6px;">Your Password :<h2 style="font-weight: 700;color: black;font-family:'Quicksand', sans-serif">${password}</h2> </h6>`;
                      await sendMail(mail, messageContent);
                      res
                        .status(200)
                        .json({ message: "Account Created Successfully" });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

exports.rejectUpdate = async (req, res) => {
  connection.query(
    "SELECT a.*,b.MAIL FROM update_table as a join credentials as b on a.USER_ID=b.ID where a.ID = ?;",
    [req.body.ID],
    async function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      } else {
        let messageContent = `<h2 style="font-weight: 700;color: black;font-family:'Quicksand', sans-serif;margin-top: 6px;">Your update request has been declined by the administrator. We appreciate your submission</h2>`;
        await sendMail(results[0].MAIL, messageContent);
        connection.query(
          "DELETE FROM `update_table` WHERE ID = ?;",
          [req.body.ID],
          function (error, resultsThree, fields) {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Something went wrong" });
            } else {
              res.status(400).json({ message: "Update Rejected" });
            }
          }
        );
      }
    }
  );
};
