const Express = require("express");
const Fuse = require("fuse.js");
const DATA = require("./data.json");

const app = Express();

app.get("/api/countries", function getCountries(req, res, next) {
  let matches = DATA;

  if (req.query["region"]) {
    const fuse = new Fuse(matches, { keys: ["region"] });
    matches = fuse.search(req.query.region);
  }

  if (req.query["name"]) {
    const fuse = new Fuse(matches, { keys: ["name"] });
    matches = fuse.search(req.query.name);
  }

  res.status(matches.length > 0 ? 200 : 404).json(matches);
});

app.get("/api/countries/:code", function getCountryByCode(req, res, next) {
  const countryCode = req.params.code;
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
