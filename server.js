require("dotenv").config();
const expres = require("express");
const database = require("./db/connection");
const app = expres();
const bodyParser = require("body-parser");
const UserRouter = require("./routes/UserRoute");
const candidateRouter = require("./routes/CandidateRouter");
const VoteRouter = require("./routes/VoteRouter");

const Port = process.env.PORT_NUMBER;

app.use(bodyParser.json());
app.use("/api", UserRouter);
app.use("/api", candidateRouter);
app.use("/api", VoteRouter)

app.listen(Port, () => {
  console.log(`server is running at port: ${Port}`);
  database;
});
