import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-2);
`;

function SignUp() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Create account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default SignUp;
