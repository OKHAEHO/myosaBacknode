const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const usersRouter = require("./routes/user/users");
const TVP1Router = require("./routes/tutorial/TVP1");
const TVP2Router = require("./routes/tutorial/TVP2");
const TVP3Router = require("./routes/tutorial/TVP3");
const TVP4Router = require("./routes/tutorial/TVP4");
const TVP6Router = require("./routes/tutorial/TVP6");
const SignUpRouter = require("./routes/user/signup");
const detailRouter = require("./routes/user/datail");
// const detailRouter = require("./routes/user/detail");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.listen(port, () => {
  console.log("연결 완료", { port });
});

app.use("/users", usersRouter);
app.use("/TVP1", TVP1Router);
app.use("/TVP2", TVP2Router);
app.use("/TVP3", TVP3Router);
app.use("/TVP4", TVP4Router);
app.use("/TVP6", TVP6Router);
app.use("/signup", SignUpRouter);
app.use("/detail", detailRouter);
// app.use("/Detail", detailRouter);
