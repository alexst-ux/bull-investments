/* eslint-disable react/prop-types */
import styled from "styled-components";
import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If NOT auth, redirect to the login page
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        console.log("navigate(/login);");
        navigate("/login");
      }
    },
    [isLoading, isAuthenticated, navigate]
  );

  // 3. Show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
