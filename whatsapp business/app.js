var express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/", function (req, res, next) {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  recipients = ['whatsapp:+919440733644', 'whatsapp:+918294620729']

  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: "Hi, Thanks for contacting our support team. A relevant agent will get back to you soon. Our typical response time is 24 hours. ",
      to: 'whatsapp:+918294620729',
    })
    .then((message) => console.log(message.sid));

  res.sendStatus(200)
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
