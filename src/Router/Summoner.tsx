import { useLocation } from "react-router-dom";

export const Summoner = () => {
  const location = useLocation().pathname.substr(11);
  console.log(location);
  return null;
};
