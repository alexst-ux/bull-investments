import styled, { css } from "styled-components";
/*
const test = css`
  text-align: center;
  ${10 > 5 && "background-color: yellow"}
`;

const Heading = styled.h1`
  font-size: 1.9rem;
  font-weight: bold;
  ${test}
`;
*/

const Heading = styled.h1`
  line-height: 1.4;
  text-align: ${(props) => (props.$textAlign ? props.$textAlign : "left")};

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `}
`;

export default Heading;
