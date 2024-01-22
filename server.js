const express = require("express");
const cors = require("cors");

const dailogFlowRouter = require("./routes/dialogFlow.route");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/chat-bot", dailogFlowRouter);
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});

app.listen(PORT, () => {
  console.log(`server is running over ${PORT}`);
});
