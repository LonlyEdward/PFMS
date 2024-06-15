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



      /* Primary Color */
  --primary-color-1: #d3dde4;
  --primary-color-2: #bdcdd7;
  --primary-color-3: #a7bcca;
  --primary-color-4: #91abbd;
  --primary-color-5: #7a9aaf;
  --primary-color-6: #6489a2;
  --primary-color-7: #4e7995;
  --primary-color-8: #386887;
  --primary-color-9: #22577a;
  --primary-color-10: #1f4e6e;
  --primary-color-20: #1b4662;
  --primary-color-30: #183d55;
  --primary-color-40: #143449;
  --primary-color-50: #112c3d;
  --primary-color-60: #0e2331;
  --primary-color-70: #0a1a25;
  --primary-color-80: #071118;


/* Secondary Color */
  --secondary-color-1: #d7eded;
  --secondary-color-2: #c3e3e4;
  --secondary-color-3: #afdadb;
  --secondary-color-4: #9cd1d2;
  --secondary-color-5: #88c8c9;
  --secondary-color-6: #74bfc0;
  --secondary-color-7: #60b5b7;
  --secondary-color-8: #4cacae;
  --secondary-color-9: #38a3a5;
  --secondary-color-10: #329395;
  --secondary-color-20: #2d8284;
  --secondary-color-30: #277273;
  --secondary-color-40: #226263;
  --secondary-color-50: #1c5253;
  --secondary-color-60: #164142;
  --secondary-color-70: #113131;
  --secondary-color-80: #0b2121;


  /* Color brand 1 */
  --color-brand-1-10: #ddf5eb;
  --color-brand-1-20: #cdf0e0;
  --color-brand-1-30: #bcebd6;
  --color-brand-1-40: #abe6cc;
  --color-brand-1-50: #9ae0c2;
  --color-brand-1-60: #89dbb8;
  --color-brand-1-70: #79d6ad;
  --color-brand-1-80: #68d1a3;
  --color-brand-1-90: #57cc99;
  --color-brand-1-100: #4eb88a;
  --color-brand-1-200: #46a37a;
  --color-brand-1-300: #3d8f6b;
  --color-brand-1-400: #347a5c;
  --color-brand-1-500: #2c664d;
  --color-brand-1-600: #23523d;
  --color-brand-1-700: #1a3d2e;
  --color-brand-1-800: #11291f;


/* Color brand 2 */
  --color-brand-2-10: #e6fbeb;
  --color-brand-2-20: #d9fae0;
  --color-brand-2-30: #ccf8d6;
  --color-brand-2-40: #c0f6cc;
  --color-brand-2-50: #b3f4c2;
  --color-brand-2-60: #a6f2b8;
  --color-brand-2-70: #99f1ad;
  --color-brand-2-80: #8defa3;
  --color-brand-2-90: #80ed99;
  --color-brand-2-100: #73d58a;
  --color-brand-2-200: #66be7a;
  --color-brand-2-300: #5aa66b;
  --color-brand-2-400: #4d8e5c;
  --color-brand-2-500: #40774d;
  --color-brand-2-600: #335f3d;
  --color-brand-2-700: #26472e;
  --color-brand-2-800: #1a2f1f;


/* Color brand 3 */
  --color-brand-3-10: #f4fef5;
  --color-brand-3-20: #eefdf0;
  --color-brand-3-30: #e9fdeb;
  --color-brand-3-40: #e3fce6;
  --color-brand-3-50: #ddfbe0;
  --color-brand-3-60: #d8fbdb;
  --color-brand-3-70: #d2fad6;
  --color-brand-3-80: #cdfad1;
  --color-brand-3-90: #c7f9cc;
  --color-brand-3-100: #b3e0b8;
  --color-brand-3-200: #9fc7a3;
  --color-brand-3-300: #8bae8f;
  --color-brand-3-400: #77957a;
  --color-brand-3-500: #647d66;
  --color-brand-3-600: #506452;
  --color-brand-3-700: #3c4b3d;
  --color-brand-3-800: #283229;




  --color-red-100: #e64545;
  --color-red-700: #cc3e3e;
  --color-red-800: #b33636;


    /* border radius */
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

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
