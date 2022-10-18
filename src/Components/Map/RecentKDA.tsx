import React from "react";

type Props = {
  champ: string;
  KDAdata: any;
};

export const RecentKDA: React.FC<Props> = ({ champ, KDAdata }) => {
  //---get KDA Data
  let kda;
  const gameData = KDAdata.filter((data: any) => data.championName === champ);
  if (gameData?.length > 0) {
    kda = (
      gameData?.reduce((prev: any, current: any) => {
        return prev + current?.kda;
      }, 0) / gameData.length
    ).toFixed(2);
  }
  console.log(kda);
  return (
    <>
      <h1>{champ}</h1>
      <h1>{kda}</h1>
    </>
  );
};
