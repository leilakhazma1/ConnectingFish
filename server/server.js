const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
const fisheriesRouter = require("./routes/fisheriesRoutes");
const usersRouter = require("./routes/userRoutes");
const storesRouter = require("./routes/storeRoutes")
app.use("/api/fisheries", fisheriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/stores", storesRouter )

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
