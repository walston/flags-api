const Express = require("express");
const Fuse = require("fuse.js");
const DATA = require("./data.json");

const app = Express();

app.get("/api/countries/", function getAll(req, res, next) {
  const data = DATA;
  res.status(200).json(data);
});

app.get("/api/countries/search", function getBy(req, res, next) {
  if (req.query["name"]) {
    const fuse = new Fuse(DATA, { keys: ["name"] });
    const finds = fuse.search(req.query.name);
    res.status(finds.length > 0 ? 200 : 404).json(finds);
  } else {
    next();
  }
});

app.get("/countries/:country_code", function getByCountryCode(req, res, next) {
  const countryCode = req.params.country_code;
  if (!countryCode) return res.status(400).send();
  if (!/^\w{3}$/.test(countryCode)) {
    return res.status(400).send("Expected 3 letter country code");
  }

  const country = DATA.find(
    (country) => country.alpha3Code === countryCode.toUpperCase()
  );

  if (!country) {
    return res.status(404).send(`No country found matching ${countryCode}`);
  } else {
    return res.status(200).json(country);
  }
});

app.listen(3001, () => console.log("listening on port 3001"));
