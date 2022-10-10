import { useQuery, UseQueryOptions } from "react-query";
import { queryViewer } from "../apis";
import { User } from "../types/graphqlTypes";

export const useQueryViewer = (
    options?:
        | Omit<UseQueryOptions<{ viewer: User }, unknown, { viewer: User }, string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    return useQuery(["viewer"], queryViewer, options);
};
