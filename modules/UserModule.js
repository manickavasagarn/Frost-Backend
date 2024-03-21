const { connection, cryptr } = require("../connection");
const moment = require("moment");

exports.myDetail = async (req, res) => {
  connection.query(
    "SELECT a.*,b.* FROM user_info as a join credentials as b on a.USER_ID=b.ID WHERE b.ID = ?",
    [req.user.empcode],
    function (error, results, fields) {
      if (error) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        if (results?.length > 0) {
          let sendData = results[0];
          delete sendData.PASSWORD;
          res.status(200).send(sendData);
        } else res.status(400).json({ message: "User not found" });
      }
    }
  );
};

exports.update = async (req, res) => {
  const { firstname, lastname, number, address, dob, gender } = req.body;
  connection.query(
    "SELECT * FROM `user_info` WHERE `USER_ID` = ?;",
    [req.user.empcode],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      } else {
        var currentTime = new Date();
        var lastUpdateTime = new Date(results[0]?.UPDATE_TIME);
        var timeDifference = currentTime.getTime() - lastUpdateTime.getTime();
        var timeDifferenceInMinutes = timeDifference / (1000 * 60);
        console.log(timeDifferenceInMinutes);
        if (timeDifferenceInMinutes >= 15 || results[0].UPDATE_TIME == null) {
          if (req.user.admin == "Yes") {
            connection.query(
              "UPDATE `user_info` SET `FIRST_NAME` = ?,`LAST_NAME` = ?,`PHONE_NUMBER` = ?,`ADDRESS` = ?,`DOB` = ?,`GENDER` = ?,UPDATE_TIME=? WHERE `USER_ID` = ?;",
              [
                firstname,
                lastname,
                number,
                address,
                dob,
                gender,
                currentTime,
                req.user.empcode,
              ],
              function (error, results, fields) {
                if (error) {
                  console.log(error);
                  res.status(500).json({ message: "Something went wrong" });
                } else {
                  res.status(200).json({ message: "Update Successful" });
                }
              }
            );
          } else {
            console.log(req.user);
            connection.query(
              "INSERT INTO `update_table` (`USER_ID`,`FIRST_NAME`, `LAST_NAME`,`PHONE_NUMBER`,`ADDRESS`,`DOB`,`GENDER`) VALUES (?, ?, ?, ?, ?, ?, ?) ",
              [
                req.user.empcode,
                firstname,
                lastname,
                number,
                address,
                dob,
                gender,
              ],
              function (error, results, fields) {
                if (error) {
                  res
                    .status(400)
                    .json({
                      message: "Your request has already been submitted.",
                    });
                } else {
                  connection.query(
                    "UPDATE `user_info` SET UPDATE_TIME=? WHERE `USER_ID` = ?;",
                    [currentTime, req.user.empcode],
                    function (error, results, fields) {
                      res
                        .status(200)
                        .json({
                          message:
                            "Your update is going to be approved by the admin.",
                        });
                    }
                  );
                }
              }
            );
          }
        } else
          res.status(400).json({
            message: `You need to wait for ${15-parseInt(timeDifferenceInMinutes)} minutes for the next update`,
          });
      }
    }
  );
};
