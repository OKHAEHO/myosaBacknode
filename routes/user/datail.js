const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post("/select", (req, res) => {
  const {
    Name,
    Married,
    Gender,
    BirthDate,
    Income,
    ConsentGiven,
    City,
    District,
  } = req.body;

  db.query(
    "SELECT * FROM InfoDetail",
    [Name, Married, Gender, BirthDate, Income, ConsentGiven, City, District],
    (error, result) => {
      if (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
        return;
      }
      res.json(result);
    }
  );
});
router.post("/insert", (req, res) => {
  const {
    Name,
    Married,
    Gender,
    BirthDate,
    Income,
    ConsentGiven,
    City,
    District,
  } = req.body;

  db.query(
    "INSERT INTO InfoDetail (Name, Married, Gender, BirthDate, Income, ConsentGiven, City, District) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [Name, Married, Gender, BirthDate, Income, ConsentGiven, City, District],
    (error, result) => {
      if (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "디테일추가완" });
    }
  );
});

module.exports = router;
