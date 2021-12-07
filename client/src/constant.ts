require("dotenv").config();

export const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
export const CALLBACK_URL = "http://localhost:3000/auth";
const SCOPE = "user,read:org,repo";
export const GET_CODE_URL = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;
