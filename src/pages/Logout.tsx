import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            navigate("/");
        } else {
            navigate("/");
        }
    }, []);

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    );
};

export default Logout;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
