import React, { useEffect } from "react";
import { getMyOrganizationList, getMyUserProfile } from "../github-api";
const { ipcRenderer } = window.require("electron");

const Home = () => {
    const getOrg = async () => {
        const data = await getMyOrganizationList();
        console.log(data);
    };

    useEffect(() => {
        ipcRenderer.send("asynchronous-message", "ping");
    }, []);

    return (
        <>
            <button onClick={getOrg}>organizationList</button>
        </>
    );
};

export default Home;
