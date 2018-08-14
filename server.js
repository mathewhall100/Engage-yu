const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


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
  .then(
    (res) => {
     console.log("Connected to Database 'medmonccfdb' Successfully.")
    }
  ).catch(() => {
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
