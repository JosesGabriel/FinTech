import express from "express";

const app = express();

app.use(express.json());

export default {
  path: "/api",
  handler: app
};
