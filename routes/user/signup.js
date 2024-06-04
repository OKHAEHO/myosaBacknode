const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

//테이블 주소 정하기
router.get("/select", function (req, res) {
  const query = "SELECT * FROM user_info";
  db.query(query, function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});

router.post("/insert", (req, res) => {
  const { first_name, last_name, id, password, contact } = req.body;
  const full_name = `${first_name}${last_name}`;
  const query =
    "INSERT INTO user_info (first_name, last_name, id, password, contact, full_name) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [first_name, last_name, id, password, contact, full_name],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.json(result);
    }
  );
});

// 이메일 중복 확인을 위한 API 엔드포인트 추가
router.post("/select", (req, res) => {
  const { id } = req.body; // GET 요청에서 쿼리 문자열로부터 데이터 읽기
  const query = "SELECT * FROM user_info WHERE id = ?";
  db.query(query, [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "서버 오류" });
    } else {
      if (result.length > 0) {
        // 이미 존재하는 이메일인 경우
        res.json({ exists: true });
      } else {
        // 존재하지 않는 이메일인 경우
        res.json({ exists: false });
      }
    }
  });
});

module.exports = router;
