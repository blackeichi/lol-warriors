import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { resizeState, serverState } from "../util/atom";
import { useTranslation } from "react-i18next";
import { LangSelect } from "../Components/LangSelect";
import { motion } from "framer-motion";
import { useState } from "react";
import { IUser } from "../util/type";

const HomeBox = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.bgColr};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  box-sizing: border-box;
`;
const ImgBox = styled.div`
  width: 270px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  border-radius: 55px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
`;
const Overlay = styled.div`
  position: absolute;
  width: 90%;
  height: 84%;
  border-radius: 50px;
  border: 8px solid ${(props) => props.theme.bgColr};
`;
const Title = styled.h1<{ size: string }>`
  font-family: "HBIOS-SYS";
  color: white;
  font-size: ${(props) => (props.size === "Web" ? "70px" : "12vw")};
  margin-bottom: 40px;
`;
const Form = styled.form<{ size: string }>`
  width: ${(props) => (props.size === "Web" ? "500px" : "90%")};
  position: relative;
  display: flex;
  align-items: center;
`;
const ContentInput = styled(motion.input)`
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  padding: 15px 25px;
  padding-left: 70px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
  font-family: "MonoplexKR-Regular";
`;
const FormBox = styled.div`
  position: relative;
  border: none;
  box-sizing: border-box;
`;
const ServerSel = styled.div`
  position: absolute;
  z-index: 1;
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 60px;
  padding: 15px 25px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: black;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Select = styled.select`
  font-size: 15px;
  font-weight: bold;
`;
const Option = styled.option`
  font-size: 15px;
  font-weight: bold;
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  padding: 0 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
const LOL = styled.h1`
  color: ${(props) => props.theme.bgColr};
  font-family: "HBIOS-SYS";
  font-size: 25px;
`;
const AutoBox = styled.div<{ size: string }>`
  width: ${(props) => (props.size === "Web" ? "500px" : "90%")};
`;
const EachUser = styled.div`
  width: 50%;
  padding: 15px 10px;
  margin-left: 70px;
  font-weight: bold;
  font-size: 15px;
  background-color: white;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
`;
const EachUser_Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const UserServer = styled.h1`
  text-transform: uppercase;
  background-color: ${(props) => props.theme.bgColr};
  padding: 5px;
  border-radius: 5px;
  color: white;
`;
const Username = styled.h1`
  font-weight: bold;
  font-family: "MonoplexKR-Regular";
`;
const Icon = styled.h1`
  color: ${(props) => props.theme.redColr};
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
export const Search = () => {
  const { register, handleSubmit } = useForm();

  const setServer = useSetRecoilState(serverState);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onValid = (data: any) => {
    if (data === "") {
      return;
    }
    navigate(`/summoner/?username=${data.username}`);
  };
  const size = useRecoilValue(resizeState);
  const { t } = useTranslation();

  const handleServer = (event: any) => {
    const server = event?.target.value;
    setServer(server);
  };
  let getUser: any[] = [];
  const savedUser = localStorage.getItem("username");
  if (savedUser !== null) {
    getUser = JSON.parse(savedUser);
  }
  const handleRecommend = (user: IUser, event: any) => {
    setServer(user.server);
    navigate(`/summoner/?username=${user.username}`);
  };
  const handleDelete = (user: IUser, event: any) => {
    getUser = getUser.filter((users) => users.username !== user.username);
    localStorage.setItem("username", JSON.stringify(getUser));
  };
  return (
    <HomeBox>
      <ImgBox>
        <Overlay />
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=FmDPQ6D42HI&t=1s"}
          width="400px"
          height="300px"
          loop={true}
          playing={true}
          muted={true}
          controls={false}
          volume={0.1}
        />
      </ImgBox>
      <Title size={size}>LoL-Warriors</Title>
      <FormBox>
        <ServerSel>
          <Select onChange={handleServer}>
            <Option value="kr">KR</Option>
            <Option value="euw1">EUW</Option>
            <Option value="jp1">JP</Option>
          </Select>
        </ServerSel>
        <Form
          size={size}
          style={{ boxSizing: "border-box" }}
          onSubmit={handleSubmit(onValid)}
        >
          <ContentInput
            {...register("username", {
              required: "Username is required",
            })}
            autoComplete="off"
            type="text"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            placeholder={t("inputPlaceholder")}
          />
          <Button>
            <LOL>LOL</LOL>
          </Button>
        </Form>
      </FormBox>
      <LangSelect fixed={true} />
      {open && getUser.length > 0 && (
        <AutoBox size={size}>
          {getUser?.map((user: any) => (
            <EachUser key={user.username}>
              <EachUser_Info
                onMouseDown={(event) => handleRecommend(user, event)}
              >
                <UserServer>{user.server}</UserServer>
                <Username>{user.username}</Username>
              </EachUser_Info>
              <Icon
                onMouseDown={(event) => {
                  handleDelete(user, event);
                }}
              >
                x
              </Icon>
            </EachUser>
          ))}
        </AutoBox>
      )}
    </HomeBox>
  );
};
