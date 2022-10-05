import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getPuuid } from "../util/api";
import { langState } from "../util/atom";

export const Summoner = () => {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get(
    "username"
  ) as string;
  const { data, isLoading } = useQuery(["data"], () => getPuuid(username));
  useEffect(() => {
    if (data !== undefined) {
      localStorage.setItem("username", username);
    }
  }, [data]);
  const lang = useRecoilValue(langState);
  console.log(data);
  return null;
};
