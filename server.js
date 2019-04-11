const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authZ");
const jwksRsa = require("jwks-rsa");
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");


// use cors middleware for cross-origin-requests
const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB 'medmonccfdb'
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/medmonccfdb", { useNewUrlParser: true })
  .then((res) => {
     console.log("Connected to Database 'medmonccfdb' Successfully.")
     console.log("=================================================")
    })
  .catch(() => {
    console.log("Connection to database failed.");
  });;
// Set up promises with mongoose
mongoose.Promise = global.Promise

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// initialise server to listen on port PORT (3001)
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
