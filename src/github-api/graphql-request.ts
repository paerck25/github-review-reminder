import { GraphQLClient } from "graphql-request";

const endpoint = "https://api.github.com/graphql";

export const graphqlRequest = (query: string) => {
    const token = localStorage.getItem("token");

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            Authorization: `token ${token}`
        }
    });

    return graphQLClient.request(query);
};
