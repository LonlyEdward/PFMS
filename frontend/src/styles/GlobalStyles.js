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


    /* border radius */
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;


    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    /* shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

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
