// json-server was built on top of express.
// once I realized we'd need to filter the data with fuzzy search I realized json-server
// wasn't going to make it any easier than just using express directly. dump it and go to source.
const Express = require("express");
// Fuse.js is a fuzzy search.
// that means you can type in "afgastan" and it will match "Afghanistan"
// despite poor spelling. https://github.com/krisk/Fuse
const Fuse = require("fuse.js");
// I removed the "countries" wrapper we'd previously put, since we don't need it anymore
const DATA = require("./data.json");

const app = Express();

// express docs https://expressjs.com/en/4x/api.html#app.get.method
// we're using `/api/countries` here, because React supports proxying requests to /api
// proxying docs
// -- react https://create-react-app.dev/docs/proxying-api-requests-in-development/
// -- ELI5 https://eli5.gg/http%20proxy
app.get("/api/countries", function getCountries(req, res, next) {
  // because we're going to POTENTIALLY filter the data (based on search/query params)
  let matches = DATA;

  // if we have a 'query.region' we'll filter, but otherwise, matches will remain the entire dataset
  if (req.query["region"]) {
    const fuse = new Fuse(matches, {
      keys: ["region"],
      threshold: 0,
    });
    matches = fuse.search(req.query.region).map((r) => r.item);
  }

  // similarly if we have a 'query.name' we'll further filter (or this could be our first filter if no region)
  if (req.query["name"]) {
    const fuse = new Fuse(matches, { keys: ["name"], threshold: 0.2 });
    matches = fuse.search(req.query.name).map((r) => r.item);
  }

  // return the matches left. that could be all 250, a subset, or even 0 if no matches were found by fuse
  res.status(matches.length > 0 ? 200 : 404).json(matches);
  // i'm not sure what `fetch` does on 404, if it triggers `.catch` that may be problematic, so i'm expecting to come back to this
});

// we need a way to get specific countries for the detail view, using the 3 letter code should work, and be concise
// using the express syntax for path-params we use `:code` to let express match _anything_ and it will take that
// matching string and put it on `req.params[:code]`
// GET /api/countries/AFG -> req.params.code === 'AFG'
// GET /api/countries/afg -> req.params.code === 'afg'
app.get("/api/countries/:code", function getCountryByCode(req, res, next) {
  const countryCode = req.params.code;
  // if there's no code, this is a bad request (shouldn't ever fire tho. that would be a no-match; safety first i guess)
  if (!countryCode) return res.status(400).send();
  // if the country code isn't 3 "word" characters, respond to the caller explaining the expectation
  if (!/^\w{3}$/.test(countryCode)) {
    return res.status(400).send("Expected 3 letter country code");
  }

  // now that we know countryCode will be a string of 3 length, we can run this find on the DATA array
  // which will return the first match (hopefully alpha3Codes don't overlap)
  const country = DATA.find(
    (country) => country.alpha3Code === countryCode.toUpperCase()
  );

  // there's a real possibility that'll be undefined, if you GET /api/countries/XXX that'd be NOT FOUND 404
  if (!country) {
    return res.status(404).send(`No country found matching ${countryCode}`);
  }

  // but if you did find something, we can happily return it as a 200 Success
  return res.status(200).json(country);
});

// we need to boot our express server up.
app.listen(3001, () => console.log("listening on port 3001"));
