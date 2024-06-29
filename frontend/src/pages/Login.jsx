// import styled from "styled-components";
// import LoginForm from "../features/authentication/LoginForm";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-2);
// `;

// function Login() {
//   return (
//     <>
//       <LoginLayout>
//         <LoginForm />
//       </LoginLayout>
//     </>
//   );
// }

// export default Login;

import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import welcome from "../assets/welcome.png";

const WelcomeHeading = styled(Heading)`
  padding: 50px 6px;
`;

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60% 40%;
  align-content: center;
  justify-content: center;
  background-color: var(--color-grey-2);
`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  background-color: #2f6157;
  background-image: url(${welcome});
  background-size: 70% 50%;
  background-position: center;
  background-repeat: no-repeat;
  color: aliceblue;
  height: 100vh;
`;

const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem;
  background-color: var(--color-grey-3);
  height: 100vh;
`;


const Description = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-0);
  padding: 4rem 8rem;
  text-align: center;
  font-size: large;
`;

function Login() {
  return (
    <>
      <LoginLayout>
        <LeftSection>
          <WelcomeHeading as="h5">
            Welcome to the Personal Finance Management System.
          </WelcomeHeading>
          <Description>
            Manage your finances effortlessly. Track expenses, manage budgets,
            set reminders and visualize your progress with clear graphs and
            charts. Gain insights into your spending habits and stay on top of
            your financial goals with ease and convenience.
          </Description>
        </LeftSection>
        <RightSection>
          <LoginForm />
        </RightSection>
      </LoginLayout>
    </>
  );
}

export default Login;
