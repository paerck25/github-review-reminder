import express from "express";
import axios from "axios";
require("dotenv").config();
const app = express();
const PORT = 4000;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.use(express.json());

app.post("/auth", async (req, res) => {
  if (req.body) {
    const code = req.body.code;
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return res.send({ data });
  }
});

app.listen(PORT, () => {
  console.log("server is running... http://localhost:4000");
});
