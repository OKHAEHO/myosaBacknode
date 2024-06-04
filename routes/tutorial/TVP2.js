const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.get("/data", function (req, res) {
  const query = "select * from T_ch2";
  db.query(query, function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});

router.post("/insert", (req, res) => {
  const {
    user_id,
    user_inputAddress,
    user_inputDanji,
    user_inputDong,
    user_inputHo,
    user_tltp,
    user_selectedZoneCode,
  } = req.body;

  const query =
    "INSERT INTO user_T2 (user_id, user_inputAddress, user_inputDanji, user_inputDong, user_inputHo, user_tltp, user_selectedZoneCode) VALUES (?, ?, ?, ?, ?, ?, ? )";

  db.query(
    query,
    [
      user_id,
      user_inputAddress,
      user_inputDanji,
      user_inputDong,
      user_inputHo,
      user_tltp,
      user_selectedZoneCode,
    ],
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
  const query = "select * from user_T2 where user_id = ?";
  db.query(query, [user_id], function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});

router.post("/update", function (req, res) {
  const {
    user_id,
    user_inputAddress,
    user_inputDanji,
    user_inputDong,
    user_inputHo,
    user_tltp,
    user_selectedZoneCode,
  } = req.body;
  const query =
    "UPDATE user_T2 SET user_inputAddress = ?, user_inputDanji = ?, user_inputDong = ?, user_inputHo = ?, user_tltp = ?, user_selectedZoneCode = ? WHERE user_id = ?";
  db.query(
    query,
    [
      user_inputAddress,
      user_inputDanji,
      user_inputDong,
      user_inputHo,
      user_tltp,
      user_selectedZoneCode,
      user_id,
    ],
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
