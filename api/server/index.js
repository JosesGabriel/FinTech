import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.post("/mailing/mobile", (req, res) => {
  if (!req.body["email"]) {
    return res.status(400).json({ message: "The email is missing." });
  }
  const email = req.body["email"];

  fs.appendFile("logger/mobile-email-wait-list.txt", email + ",\n", err => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error has occurred.", meta: { errors: err } });
    }
    return res
      .status(200)
      .json({ message: "Successfully added email to waiting list." });
  });
});

export default {
  path: "/api",
  handler: app
};
