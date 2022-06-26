import { useQuery, UseQueryOptions } from "react-query";
import { fetchPullRequest } from "./apis";
import { PullRequest } from "./types";

export const usePullRequests = (
    options?: Omit<UseQueryOptions<PullRequest[], unknown, PullRequest[], string[]>, "queryKey" | "queryFn"> | undefined
) => {
    return useQuery(["pullRequests"], fetchPullRequest, options);
};
