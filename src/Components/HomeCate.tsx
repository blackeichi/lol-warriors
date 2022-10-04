import React from "react";
import { useRecoilValue } from "recoil";
import { nextState, pageState } from "../util/atom";
import { homeData } from "../util/data";
import {
  BotBlock,
  ContentBox,
  ContentInput,
  ContentTitle,
  HomeBox,
  TopBlock,
} from "../util/componentStyle";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const boxMove = {
  enter: (isNext: number) => {
    return {
      top: isNext > 0 ? 1700 : -1700,
    };
  },
  center: {
    zIndex: 1,
    top: 0,
    display: "flex",
  },
  exit: (isNext: number) => {
    return {
      top: isNext > 0 ? -1700 : 1700,
    };
  },
};

export const HomeCate = () => {
  const pages = useRecoilValue(pageState);
  const { register, handleSubmit } = useForm();
  const isNext = useRecoilValue(nextState);
  const navigate = useNavigate();
  const onValid = (data: any) => {
    navigate(`/summoner/?username=${data.username}`);
  };
  return (
    <AnimatePresence custom={isNext}>
      <HomeBox
        key={pages}
        variants={boxMove}
        custom={isNext}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 2 }}
      >
        <TopBlock />
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactPlayer
            url={homeData[pages].url}
            width="100vw"
            height="100vh"
            volume={0.1}
            playing={true}
            loop={true}
            controls={false}
            style={{
              maxHeight: "90vh",
              pointerEvents: "none",
              maxWidth: "1500px",
            }}
          />
          <ContentBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 6 }}
          >
            <ContentTitle>{homeData[pages].title}</ContentTitle>
            {homeData[pages].input && (
              <form
                style={{ boxSizing: "border-box" }}
                onSubmit={handleSubmit(onValid)}
              >
                <ContentInput
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  placeholder="소환사명..."
                />
              </form>
            )}
          </ContentBox>
        </div>
        <BotBlock />
      </HomeBox>
    </AnimatePresence>
  );
};
