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
    border-top: 8px solid #808ea0;
    border-right: 8px solid #808ea0;
    border-bottom: 8px solid #808ea0;
    border-left: 8px solid #24292f;
    background: transparent;
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export default LoadingSpinner;
