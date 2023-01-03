import React from "react";
import DonutChart from "react-donut-chart";
import styled from "styled-components";
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WinRate = styled.h1`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
`;
type Idata = {
  win: number;
  defeat: number;
};

export const Piechart: React.FC<Idata> = ({ win, defeat }) => {
  return (
    <Box>
      <DonutChart
        data={[
          {
            label: "패배",
            value: defeat,
          },
          {
            label: "승리",
            value: win,
          },
        ]}
        colors={["#f76b8a", "#13D8F6"]}
        interactive={false}
        width={150}
        height={150}
        outerRadius={1}
        innerRadius={0.6}
        legend={false}
        strokeColor={"none"}
      />
      <WinRate>{Math.floor((win / (win + defeat)) * 100)} %</WinRate>
    </Box>
  );
};
