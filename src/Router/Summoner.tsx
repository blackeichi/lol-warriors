import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getPuuid } from "../util/api";

export const Summoner = () => {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get(
    "username"
  ) as string;
  const { data, isLoading } = useQuery(["data"], () => getPuuid(username));
  console.log(data);
  return null;
};
