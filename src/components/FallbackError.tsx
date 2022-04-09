import React from "react";
import styled from "styled-components";

const FallbackError = () => {
    return (
        <CenterContainer>
            <ErrorMessage>예기치 않은 에러가 발생했습니다!</ErrorMessage>
            <ErrorMessage>잠시후 다시 시도해주세요.</ErrorMessage>
        </CenterContainer>
    );
};

export default FallbackError;

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const ErrorMessage = styled.div`
    font-size: 24px;
`;
