let dbConnect = require("./dbConnect");

const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
const fisheriesRouter = require("./routes/fisheries");
const usersRouter = require("./routes/users");
app.use("/fisheries", fisheriesRouter);
app.use("/users", usersRouter);

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ConnectingFisheries application." });
});

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

