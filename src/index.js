const express = require("express");
const gratitudeRouter = require("./routes/gratitudeRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("<h2> Working! </h2>");
// });

app.use("/api/gratitudes", gratitudeRouter)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});