import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 50px;
  border-left: 1px solid black;
`;

type Tuser = {
  user: any;
  me: string;
};

export const EachInUser = ({ user, me }: Tuser) => {
  return <Box></Box>;
};
