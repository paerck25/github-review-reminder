import { ClientError } from "graphql-request/dist/types";
import { useQuery, UseQueryOptions } from "react-query";
import { queryMyProfile } from "../apis";
import { User } from "../types/graphqlTypes";

export const useMyProfile = (
    options?:
        | Omit<UseQueryOptions<{ viewer: User }, ClientError, { viewer: User }, string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    return useQuery(["myProfile"], queryMyProfile, options);
};
