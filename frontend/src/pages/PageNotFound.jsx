import Error from "../../public/error.jpg";
import React from "react";
import styled from "styled-components"
import Heading from "../ui/Heading"

const Img = styled.img`
  width: 40rem;
`
const Sdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function PageNotFound() {
  return (
    <Sdiv>
        <Img src={Error} alt="Example" />
        <Heading as="h4">Error 404 PAGE NOT FOUND</Heading>
    
    </Sdiv>
  );
}

export default PageNotFound;
