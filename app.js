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

app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.find((store) => {
    return store.id === Number(req.params.id);
  });
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const keywordLowerCase = keyword.toLowerCase().split(" ").join(" ");

  // search restaurant name
  const restaurant = restaurantList.results.filter((store) => {
    const storeLowerCase = store.name.toLowerCase();
    const categoryLowerCase = store.category.toLowerCase();
    const locationLowerCase = store.location.toLowerCase();
    return (
      storeLowerCase.includes(keywordLowerCase) ||
      categoryLowerCase.includes(keywordLowerCase) ||
      locationLowerCase.includes(keywordLowerCase)
    );
  });
  const noSearchResult =
    restaurant.length === 0 ? "查詢不到相關結果，請嘗試搜尋其他關鍵字" : null;
  // 差搜尋沒有結果時也有對應頁面提示
  res.render("index", {
    restaurant: restaurant,
    keyword: keyword,
    noSearchResult: noSearchResult,
  });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
