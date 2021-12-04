import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

export const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = "http://localhost:3000/auth";
const BASE_URL = "https://api.github.com";
const GET_CODE_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
  const { data } = await axios.get(BASE_URL + endpoint, config);
  return data;
};

const _apiPost = async (endpoint: string, config?: AxiosRequestConfig) => {
  const { data } = await axios.post(BASE_URL + endpoint, config);
  return data;
};

export const githubLoginUrl = () => {
  return GET_CODE_URL;
};

export const getMyOrganizationList = async () => {
  const token = localStorage.getItem("token");
  return await _apiGet("/user/orgs", {
    headers: {
      Accept: "application/json",
      Authorization: `token ${token}`,
    },
  });
};

export const getRepositoriesByOrg = async ({ org }: { org: string }) => {
  const token = localStorage.getItem("token");
  return await _apiGet(`/orgs/${org}/repos`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getPullRequestsByRepo = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const token = localStorage.getItem("token");
  return await _apiGet(`/repos/${owner}/${repo}/pulls`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getReivewsByPull = async ({
  owner,
  repo,
  pull_number,
}: {
  owner: string;
  repo: string;
  pull_number: number;
}) => {
  const token = localStorage.getItem("token");
  return await _apiGet(`/repos/${owner}/${repo}/pulls/${pull_number}/reviews`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export const getReviewersByPull = async ({
  owner,
  repo,
  pull_number,
}: {
  owner: string;
  repo: string;
  pull_number: number;
}) => {
  const token = localStorage.getItem("token");
  return await _apiGet(
    `/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
};
