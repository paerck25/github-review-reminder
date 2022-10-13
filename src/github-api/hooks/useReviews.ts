import { ClientError } from "graphql-request/dist/types";
import { useQuery, UseQueryOptions } from "react-query";
import { queryReviews } from "../apis";
import { User } from "../types/graphqlTypes";

export const useReviews = (
    options?:
        | Omit<UseQueryOptions<{ viewer: User }, ClientError, { viewer: User }, string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    return useQuery(["viewer"], queryReviews, options);
};
