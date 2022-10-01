import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import { nextState, pageState } from "../util/atom";
import { RemoCon } from "../util/componentStyle";

export const Remocon = () => {
  const [pages, setPage] = useRecoilState(pageState);
  const setIsNext = useSetRecoilState(nextState);
  const onUp = () => {
    setPage((prev) => prev - 1);
    setIsNext(-1);
  };
  const onDown = () => {
    setPage((prev) => prev + 1);
    setIsNext(1);
  };
  return (
    <RemoCon>
      {pages !== 0 && (
        <FontAwesomeIcon
          onClick={onUp}
          style={{ cursor: "pointer" }}
          color="white"
          icon={faArrowUp}
        />
      )}
      {pages !== 4 && (
        <FontAwesomeIcon
          onClick={onDown}
          style={{ cursor: "pointer" }}
          color="white"
          icon={faArrowDown}
        />
      )}
    </RemoCon>
  );
};
