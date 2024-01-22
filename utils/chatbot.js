const dialogflow = require("dialogflow");
const config = require("../config/devKey.js");
const uuid = require("uuid");
// Create a new session
const projectId = config.googleProjectId;
const sessionId = uuid.v4();
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

const textQuery = async (userText, userId) => {
  // connect the dialog Flow api----->dialog Flow Client
  // detect the intent
  // filter out
  // send the response
  try {
    const sessionPath = sessionClient.sessionPath(
      projectId,
      sessionId + userId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: userText,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    const newRs = responses[0];
    const {responseId,queryResult}=newRs;
    const resAns = queryResult.fulfillmentText;
    console.log("resonsed data *********", newRs);
    return {
      responseId,
      resAns,
    };
  } catch (error) {
    console.log(error.message);
    return error;
  }


};

module.exports = {
  textQuery,
};
