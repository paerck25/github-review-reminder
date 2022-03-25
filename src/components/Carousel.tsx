import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useThrottle from "../hooks/useThrottle";
import { ReactComponent as RightArrowIcon } from "../assets/icons/right-arrow.svg";
import ImageA from "../assets/images/org_access.png";

const Carousel = () => {
    const [page, setPage] = useState(0);
    const CARD_LENGTH = 7;

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
                <CardTrack page={page}>
                    <Card>
                        <Description>{`팀원이 풀리퀘스트를 올렸는데\n바빠서 미루다 까먹은적 있지않나요?`}</Description>
                    </Card>
                    <Card>
                        <Description>{`아니면 내가 올렸는데\n팀원의 리뷰가 늦어진적 있지않나요?`}</Description>
                    </Card>
                    <Card>
                        <Description>{`저는 그랬습니다.`}</Description>
                    </Card>
                    <Card>
                        <Description>{`그래서 만들었어요`}</Description>
                    </Card>
                    <Card>
                        <Title>리뷰 좀 해주세요.</Title>
                    </Card>
                    <Card>
                        <Description>{`사용하시려면 Organization\n Access 허용이 필요합니다.`}</Description>
                    </Card>
                    <Card>
                        <Image src={ImageA} />
                    </Card>
                </CardTrack>
            </ViewPort>
            <RightArrow hasNextPage={page === CARD_LENGTH - 1} onClick={next} />
        </Container>
    );
};

export default Carousel;

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

const Description = styled.div`
    color: #24292f;
    font-size: 20px;
    white-space: pre-wrap;
    text-align: center;
`;

const Title = styled.div`
    color: #24292f;
    font-weight: bold;
    font-size: 36px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;
