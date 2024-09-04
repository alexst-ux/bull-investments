import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  background-color: ${(props) =>
    props.dark ? "var(--color-indigo-700)" : "var(--color-grey-0)"};
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" dark={isDarkMode} />
    </StyledLogo>
  );
}

export default Logo;
