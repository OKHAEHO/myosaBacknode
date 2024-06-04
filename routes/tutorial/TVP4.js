const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
module.exports = router;

router.get("/data", function (req, res) {
  const query = "select * from T_ch4";
  db.query(query, function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
router.post("/select", function (req, res) {
  const { user_id } = req.body;
  const query = "select * from user_T4 where user_id = ?";
  db.query(query, [user_id], function (error, result) {
    if (error) {
      console.log(error);
    }
    res.json(result);
  });
});
router.post("/insert", (req, res) => {
  const { user_id, user_checkData } = req.body;

  // user_id 값으로 된 데이터가 존재하는지 확인합니다.
  const selectQuery = "SELECT * FROM user_T4 WHERE user_id = ?";
  db.query(
    selectQuery,
    [user_id],
    (selectError, selectResults, selectFields) => {
      if (selectError) {
        console.error("데이터 조회 중 오류 발생:", selectError);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
      }

      // user_id 값으로 된 데이터가 존재할 경우에만 삭제합니다.
      if (selectResults.length > 0) {
        // user_id 값으로 된 데이터를 삭제합니다.
        const deleteQuery = "DELETE FROM user_T4 WHERE user_id = ?";
        db.query(
          deleteQuery,
          [user_id],
          (deleteError, deleteResults, deleteFields) => {
            if (deleteError) {
              console.error("데이터 삭제 중 오류 발생:", deleteError);
              return res
                .status(500)
                .json({ message: "서버 오류가 발생했습니다." });
            }

            // user_checkData를 순회하며 각 요소를 별도의 행으로 삽입합니다.
            user_checkData.forEach((data) => {
              const query =
                "INSERT INTO user_T4 (user_id, user_checkData) VALUES (?, ?)";

              db.query(query, [user_id, data], (error, results, fields) => {
                if (error) {
                  console.error("쿼리 실행 중 오류 발생:", error);
                  return res
                    .status(500)
                    .json({ message: "서버 오류가 발생했습니다." });
                }
              });
            });

            // 데이터가 성공적으로 추가되었음을 클라이언트에 응답합니다.
            res
              .status(200)
              .json({ message: "데이터가 성공적으로 추가되었습니다." });
          }
        );
      } else {
        // user_id 값으로 된 데이터가 존재하지 않으면 바로 새로운 데이터를 삽입합니다.
        user_checkData.forEach((data) => {
          const query =
            "INSERT INTO user_T4 (user_id, user_checkData) VALUES (?, ?)";

          db.query(query, [user_id, data], (error, results, fields) => {
            if (error) {
              console.error("쿼리 실행 중 오류 발생:", error);
              return res
                .status(500)
                .json({ message: "서버 오류가 발생했습니다." });
            }
          });
        });

        // 데이터가 성공적으로 추가되었음을 클라이언트에 응답합니다.
        res
          .status(200)
          .json({ message: "데이터가 성공적으로 추가되었습니다." });
      }
    }
  );
});
