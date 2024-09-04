/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// the main App element is called "StyledApp" by convention
const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App({ props }) {
  useEffect(() => {
    document.title = "The Wild Oasis";
  }, []);

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("Check in")}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check out")}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of quests" />
              <Input type="number" placeholder="Number of quests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
