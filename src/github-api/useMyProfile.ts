import { useQuery, UseQueryOptions } from "react-query";
import { fetchMyUserProfile } from "./apis";
import { UserProfile } from "./types";

export const useMyProfile = (
    options?: Omit<UseQueryOptions<UserProfile, unknown, UserProfile, string[]>, "queryKey" | "queryFn"> | undefined
) => {
    return useQuery(["myProfile"], fetchMyUserProfile, options);
};
