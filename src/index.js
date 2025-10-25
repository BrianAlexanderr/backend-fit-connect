const express = require("express");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const eventRoutes = require("./routes/eventRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Port dari Render atau default ke 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/trainings", trainingRoutes);

app.get("/", (req, res) => {
  res.send("✅ Express server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
