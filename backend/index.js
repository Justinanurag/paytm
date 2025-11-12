const express = require("express");
const mainRouter = require("./routes/mainRouter.js");
const connectDB = require("./db.js");

require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.json({ message: "Home Route" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
