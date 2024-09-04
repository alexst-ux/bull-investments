import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import useUser from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const {
    user: { id: uid },
  } = useUser();

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      {uid != import.meta.env.VITE_USERUID ? (
        <>
          <Row>
            <Heading as="h3">Update user data</Heading>
            <UpdateUserDataForm />
          </Row>

          <Row>
            <Heading as="h3">Update password</Heading>
            <UpdatePasswordForm />
          </Row>
        </>
      ) : (
        <span>the page is closed for the current user</span>
      )}
    </>
  );
}

export default Account;
