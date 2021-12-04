import express from "express";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, githubLoginUrl } from "./github-api";
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/getLoginUrl", (req, res) => {
  const url = githubLoginUrl();
  res.send({ url });
});

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
    return res.send({ accessToken: data });
  }
});

app.listen(PORT, () => {
  console.log("server is running... http://localhost:4000");
});
