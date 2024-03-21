const { connection, cryptr } = require("../connection");
// const { getRecordsCount, getEmpCode, getEmpcodeForReset } = require('../services/AdminServices');
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
 //For dev

exports.register = async (req, res) => {
  const {
    username,
    password,
    firstname,
    lastname,
    mail,
    number,
    address,
    dob,
    gender,
  } = req.body;
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
                  function (error, results, fields) {
                    if (error) {
                      console.log(error);
                      res.status(500).json({ message: "Something went wrong" });
                    } else
                      res
                        .status(200)
                        .json({ message: "Account Created Successfully" });
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

exports.auth = async (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM `credentials` WHERE USERNAME = ? AND STATUS = 'Active'",
    [username],
    function (error, results, fields) {
      if (error) {
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        if (results?.length > 0) {
          let decryptedPassword = cryptr.decrypt(results[0]?.PASSWORD);
          if (decryptedPassword === password) {
            if (results[0]?.RESET_REQUIRED == "Yes")
              res.status(200).send({ to: "/reset" });
            else {
              let time = new Date();
              var token = jwt.sign(
                {
                  username: username,
                  admin: results[0].IS_ADMIN,
                  empcode: results[0].ID,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "30m",
                }
              );
              res
                .status(200)
                .send({ to: "/dashboard", role: results[0].ROLE, token });
            }
          } else {
            res.status(400).json({ message: "Incorrect Username or Password" });
          }
        } else res.status(400).json({ message: "User not found" });
      }
    }
  );
};
