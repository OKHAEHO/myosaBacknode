const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
module.exports = router;

router.post("/insert", (req, res) => {
  const user_id = req.body.user_id; // req.body에서 user_id를 받아옵니다.

  const query =
    "INSERT INTO user_T6 (user_id, user_solution) SELECT u.user_id, c.solution FROM user_T4 u JOIN T_ch6 c ON u.user_checkData = c.value_ch6 WHERE NOT EXISTS (SELECT 1 FROM user_T6 WHERE user_T6.user_id = ?)";
  db.query(query, [user_id], (error, results, fields) => {
    if (error) {
      console.error("쿼리 실행 중 오류 발생:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    } else {
      if (results.affectedRows === 0) {
        res.status(400).json({ message: "이미 존재하는 user_id입니다." });
      } else {
        res
          .status(200)
          .json({ message: "데이터가 성공적으로 추가되었습니다." });
      }
    }
  });
});

router.get("/data", function (req, res) {
  const query = "select * from user_T6";
  db.query(query, function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
