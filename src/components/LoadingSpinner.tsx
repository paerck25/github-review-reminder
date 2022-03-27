import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 6px solid #808ea0;
    border-right: 6px solid #808ea0;
    border-bottom: 6px solid #808ea0;
    border-left: 6px solid #24292f;
    background: transparent;
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;

export default LoadingSpinner;
