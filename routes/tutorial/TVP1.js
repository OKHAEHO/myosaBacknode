const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post("/insert", (req, res) => {
  const { user_id, user_useableMoney, user_selectedDaechu, user_inputValue } =
    req.body;

  const query =
    "INSERT INTO user_T1 (user_id, user_useableMoney, user_selectedDaechu, user_inputValue) VALUES (?, ?, ?,?)";

  db.query(
    query,
    [user_id, user_useableMoney, user_selectedDaechu, user_inputValue],
    (error, results, fields) => {
      if (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
      } else {
        res
          .status(200)
          .json({ message: "데이터가 성공적으로 추가되었습니다." });
      }
    }
  );
});
router.post("/select", function (req, res) {
  const { user_id } = req.body;
  const query = "select * from user_T1 where user_id = ?";
  db.query(query, [user_id], function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
router.post("/update", function (req, res) {
  const { user_id, user_useableMoney, user_selectedDaechu, user_inputValue } =
    req.body;
  const query =
    "UPDATE user_T1 SET user_useableMoney = ?, user_selectedDaechu = ?, user_inputValue = ? WHERE user_id = ?";
  db.query(
    query,
    [user_useableMoney, user_selectedDaechu, user_inputValue, user_id],
    (error, results, fields) => {
      if (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
      } else {
        res
          .status(200)
          .json({ message: "데이터가 성공적으로 수정되었습니다." });
      }
    }
  );
});

module.exports = router;
