const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post("/login", (req, res) => {
  const { id, password } = req.body;

  db.query(
    "SELECT * FROM user_info WHERE id = ? AND password = ?",
    [id, password],
    (error, results, fields) => {
      if (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
      } else {
        if (results.length > 0) {
          // 인증 성공
          const userData = results[0];
          res.status(200).json({ id: userData.id, name: userData.full_name });
        } else {
          // 인증 실패
          res
            .status(401)
            .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
        }
      }
    }
  );
});
router.post("/signUp", (req, res) => {
  const { id, password, name, contact } = req.body;

  // id 중복 확인 쿼리 실행
  db.query("SELECT * FROM user_info WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error("Error checking for duplicate id:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // 이미 존재하는 id인 경우
    if (results.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    // 존재하지 않는 id인 경우, 새로운 사용자 추가
    db.query(
      "INSERT INTO user_info (id, password, name, contact) VALUES (?, ?, ?, ?)",
      [id, password, name, contact],
      (error, result) => {
        if (error) {
          console.error("Error inserting new user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res
          .status(200)
          .json({ message: "사용자가 성공적으로 등록되었습니다." });
      }
    );
  });
});

module.exports = router;
