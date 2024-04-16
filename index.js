const express = require('express');

// We import the body-parser package.
// This package contains middleware that can handle
// the parsing of many different kinds of data,
// making it easier to work with data in routes that
// accept data from the client (POST, PATCH).
const bodyParser = require("body-parser");

const app = express();
const port = 3000;


// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// These are now route imports, not database imports!
const food = require("./route/food");
const drinks = require("./route/drinks");
const deserts = require("./route/deserts");



// Use our Routes
app.use("/api/food", food);
app.use("/api/drinks", drinks);
app.use("/api/deserts", deserts);










app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });
