const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, "../public");
const DIST_PATH = path.join(__dirname, "../dist");

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
};

startServer();
