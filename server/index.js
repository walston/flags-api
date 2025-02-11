const Express = require("express");
const Fuse = require("fuse.js");
const morgan = require("morgan");
const DATA = require("./data.json");

const app = Express();

app.use(morgan("tiny"));

app.get("/api/countries", function getCountries(req, res, next) {
  let matches = DATA;

  if (req.query["region"]) {
    const fuse = new Fuse(matches, {
      keys: ["region"],
      threshold: 0,
    });
    matches = fuse.search(req.query.region).map((r) => r.item);
  }

  if (req.query["name"]) {
    const fuse = new Fuse(matches, { keys: ["name"], threshold: 0.2 });
    matches = fuse.search(req.query.name).map((r) => r.item);
  }

  res.status(matches.length > 0 ? 200 : 404).json(matches);
});

app.get("/api/countries/:code", function getCountryByCode(req, res, next) {
  const countryCode = req.params.code;
  if (!countryCode) return res.status(400).send();
  if (!/^\w{3}$/.test(countryCode)) {
    return res.status(400).send("Expected 3 letter country code");
  }

  const country = DATA.find((c) => c.alpha3Code === countryCode.toUpperCase());

  if (!country) {
    return res.status(404).send(`No country found matching ${countryCode}`);
  }

  if ("expand" in req.query) {
    const expanded = DATA.filter((borderer) =>
      country.borders?.includes(borderer.alpha3Code)
    );
    return res.status(200).json({
      ...country,
      borders: expanded,
    });
  }

  return res.status(200).json(country);
});

app.listen(9001, () => {
  process.stdout.write("Flags API listening on 9001...");
});
