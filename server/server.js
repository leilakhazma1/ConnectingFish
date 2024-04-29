const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
const fisheriesRouter = require("./routes/fisheriesRoutes");
const usersRouter = require("./routes/userRoutes");
app.use("/api/fisheries", fisheriesRouter);
app.use("/api/users", usersRouter);

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ConnectingFisheries application." });
});

// Require dbConnect after initializing app
let dbConnect = require("./dbConnect");

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
