import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;

  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h1" $textAlign="center">
        Signup myInvest account
      </Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default Signup;
