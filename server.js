import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const { BASEURL, VERSION, APIKEY } = process.env;

const proyMiddleware = async (req, res, next) => {
  const path = req.path.substring(1);
  const query = new URLSearchParams(req.query).toString();
  let url = `${BASEURL}/${VERSION}/${path}`;
  if (query.length > 0) {
    url = `${url}?${query}&api_key=${APIKEY}&format=json`;
  } else {
    url = `${url}?api_key=${APIKEY}&format=json`;
  }
  let pRes = await fetch(url, {
    headers: req.headers,
  });
  console.log(url);
  res.status(pRes.status);
  pRes.body.pipe(res);
  next();
};

app.use(proyMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
