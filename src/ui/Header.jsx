import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import CurrencyToggle from "./CurrencyToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  /* justify-content: flex-end; // move all to the end of line */
  justify-content: space-between;
`;

const StyledHeaderLeft = styled.div`
  display: inline-flex;
`;

function Header() {
  return (
    <StyledHeader>
      <CurrencyToggle />
      <StyledHeaderLeft>
        <UserAvatar />
        <HeaderMenu />
      </StyledHeaderLeft>
    </StyledHeader>
  );
}

export default Header;
