import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getMyOrganizationList, getMyUserProfile } from "../github-api";

const Home = () => {
    const { data, isLoading, error } = useQuery("myUserProfile", getMyUserProfile);

    const { data: orgData } = useQuery("myOrgs", getMyOrganizationList);

    useEffect(() => {
        if (orgData) {
            console.log(orgData.data);
        }
    }, [orgData]);

    return (
        <>
            <button>organizationList</button>
        </>
    );
};

export default Home;
