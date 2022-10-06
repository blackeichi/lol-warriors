import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getPuuid } from "../util/api";
import { langState, serverState } from "../util/atom";

let getUser: any[] = [];

export const Summoner = () => {
  const server = useRecoilValue(serverState);
  const location = useLocation();
  const username = new URLSearchParams(location.search).get(
    "username"
  ) as string;
  const { data, isLoading } = useQuery(["data"], () =>
    getPuuid(server, username)
  );
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser !== null) {
      getUser = JSON.parse(savedUser);
    }
    if (data !== undefined) {
      const newObject = {
        username,
        server,
      };
      const exist = getUser.find(
        (element) => element.username === newObject.username
      );
      console.log(exist);
      if (exist) {
        return;
      }
      getUser.push(newObject);
      localStorage.setItem("username", JSON.stringify(getUser));
    }
  }, []);
  const lang = useRecoilValue(langState);
  return null;
};
