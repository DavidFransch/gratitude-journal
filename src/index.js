const express = require("express");
const gratitudeRouter = require("./routes/gratitudeRoutes");
const bodyParser = require("body-parser");
const apicache = require("apicache");
const { swaggerDocs: SwaggerDocs } = require("./swagger");

const cache = apicache.middleware;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use("/api/gratitudes", gratitudeRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  SwaggerDocs(app, PORT);
});

module.exports = app;