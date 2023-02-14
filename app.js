// Include express from node_modules
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

// Define server related variables
const port = 3000;

//express template engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

// Handle request and response here
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList.results });
});

app.get("/restaurant/:id", (req, res) => {
  const restaurant = restaurantList.results.find((store) => {
    return store.id === Number(req.params.id);
  });
  res.render("show", { restaurant: restaurant });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
