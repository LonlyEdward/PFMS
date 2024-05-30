import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/* colors */
:root {
    /* Grey */
    --color-grey-0: #f8f9fa;
    --color-grey-1: #f1f3f5;
    --color-grey-2: #e9ecef;
    --color-grey-3: #dee2e6;
    --color-grey-4: #ced4da;
    --color-grey-5: #adb5bd;
    --color-grey-6: #868e96;
    --color-grey-7: #495057;
    --color-grey-8: #343a40;
    --color-grey-9: #212529;

    /* others */
    /* --color-sucess: #4caf50; */
    /* --color-gradient: linear-gradient(to right, #373B44, #4286f4); */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-7);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

html {
  font-size: 62.5%;
}

`;

export default GlobalStyles;
