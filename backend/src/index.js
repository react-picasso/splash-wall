import fetch from "node-fetch";
import Unsplash from "unsplash-js";
import { toJson } from "unsplash-js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

dotenv.config();

global.fetch = fetch;

const unsplash = new Unsplash({
    accessKey: process.env.ACCESS_KEY,
    secret: process.env.SECRET_KEY,
    callbackUrl: process.env.CALLBACK_URL
});

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/api/photos", (req, res) => {
    unsplash.photos
        .listPhotos(req.query.page, req.query.count)
        .then(toJson)
        .then((json) => res.json(json))
        .catch((err) => console.log(err))
});

app.get("/api/photos/search", (req, res) => {
    unsplash.search
    .photos(req.query.keyword, req.query.page, req.query.count)
    .then(toJson)
    .then((json) => res.json(json))
    .catch((err) => console.log(err));
});

const { PORT = 5000 } = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});