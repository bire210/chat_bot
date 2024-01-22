const { textQuery } = require("../utils/chatbot");

const askQuestion = async (req, res) => {
  console.log("request ***************", req.body);
  const { userText, userId } = req.body;
  const data = await textQuery(userText, userId);
  res.status(200).json({
    data: data,
  });
  try {
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const eventQuery = async (req, res) => {
  res.status(200).json({
    message: "event is asked",
  });
};

module.exports = { askQuestion, eventQuery };
