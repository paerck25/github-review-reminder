import React, { useState } from "react";
import styled, { css } from "styled-components";
import useThrottle from "../hooks/useThrottle";
import { ReactComponent as RightArrowIcon } from "../assets/icons/right-arrow.svg";

interface CarouselProps {
    children: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
    const [page, setPage] = useState(0);
    const CARD_LENGTH = React.Children.toArray(children).length;

    const next = useThrottle(() => {
        if (page === CARD_LENGTH - 1) return;
        setPage(prev => prev + 1);
    }, 400);

    const prev = useThrottle(() => {
        if (page === 0) return;
        setPage(prev => prev - 1);
    }, 400);

    return (
        <Container>
            <LeftArrow hasPrevPage={page === 0} onClick={prev} />
            <ViewPort>
                <CardTrack page={page}>{children}</CardTrack>
            </ViewPort>
            <RightArrow hasNextPage={page === CARD_LENGTH - 1} onClick={next} />
        </Container>
    );
};

export default Carousel;

Carousel.Card = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    return <Card>{children}</Card>;
};

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin: 0px auto;
    margin-bottom: 16px;
`;

const ViewPort = styled.div`
    width: 300px;
    height: 150px;
    border-radius: 16px;
    overflow: hidden;
`;

const ArrowBase = styled(RightArrowIcon)`
    width: 30px;
    height: 30px;
    cursor: pointer;
    .st0 {
        fill: #24292f;
    }
`;

const LeftArrow = styled(ArrowBase)<{ hasPrevPage: boolean }>`
    margin-right: 50px;
    transform: rotate(180deg);
    ${props =>
        props.hasPrevPage &&
        css`
            cursor: not-allowed;
            .st0 {
                fill: #e5e8eb;
            }
        `}
`;

const RightArrow = styled(ArrowBase)<{ hasNextPage: boolean }>`
    margin-left: 50px;
    ${props =>
        props.hasNextPage &&
        css`
            cursor: not-allowed;
            .st0 {
                fill: #e5e8eb;
            }
        `}
`;

const CardTrack = styled.div<{ page: number }>`
    display: flex;
    width: calc(100% * 10);
    height: 100%;
    transition: all 0.3s ease-in-out;
    transform: ${props => `translateX(${-(300 + 8) * props.page}px)`};
`;

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 150px;
    border-radius: 16px;
    margin-right: 8px;
`;
