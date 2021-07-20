const express = require("express");
const connectDB = require("./config/mongoDB");
const cors = require("cors");
const path = require("path");
const app = express();

// mongodb
connectDB();

// middleware
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/application", require("./routes/application"));
app.use("/api/applications", require("./routes/applications"));

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is running on: ${PORT}`));
