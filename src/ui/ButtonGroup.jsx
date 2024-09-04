import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: ${(props) =>
    props?.justify !== undefined ? props.justify : "flex-end"};
`;

export default ButtonGroup;
