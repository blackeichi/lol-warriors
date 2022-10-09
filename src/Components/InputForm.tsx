import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { resizeState, serverState } from "../util/atom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IUser } from "../util/api";

const FormBox = styled.div`
  position: relative;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
const Form = styled.form<{ size: string; home: boolean }>`
  width: ${(props) =>
    props.size !== "Mobile" ? (props.home ? "500px" : "300px") : "90vw"};
  display: flex;
  align-items: center;
`;
const ContentInput = styled.input<{ home: boolean }>`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => (props.home ? "50px" : "30px")};
  padding-left: 70px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
  font-family: "MonoplexKR-Regular";
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
  margin-left: 5px;
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
const AutoBox = styled.div<{ size: string; home: boolean }>`
  width: ${(props) => (props.size !== "Mobile" ? "100%" : "90%")};
  position: absolute;
  top: ${(props) => (props.home ? "50px" : "30px")};
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
const EachUserInfo = styled.div`
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

type Interface = {
  home?: boolean;
};

export const InputForm: React.FC<Interface> = ({ home = false }) => {
  const size = useRecoilValue(resizeState);
  const setServer = useSetRecoilState(serverState);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const onValid = (data: any) => {
    if (data === "") {
      return;
    }
    navigate(`/summoner/?username=${data.username}`);
    window.location.reload();
  };
  const { t } = useTranslation();

  const handleServer = (event: any) => {
    const server = event?.target.value;
    setServer(server);
  };
  const handleRecommend = (user: IUser, event: any) => {
    setServer(user.server);
    navigate(`/summoner/?username=${user.username}`);
    window.location.reload();
  };
  let getUser: any[] = [];
  const savedUser = localStorage.getItem("username");
  if (savedUser !== null) {
    getUser = JSON.parse(savedUser);
  }
  const handleDelete = (user: IUser, event: any) => {
    getUser = getUser.filter((users) => users.username !== user.username);
    localStorage.setItem("username", JSON.stringify(getUser));
  };

  return (
    <FormBox>
      <ServerSel>
        <Select onChange={handleServer}>
          <Option value="kr">KR</Option>
          <Option value="euw1">EUW</Option>
          <Option value="jp1">JP</Option>
        </Select>
      </ServerSel>
      <Form
        home={home}
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
          home={home}
        />
        <Button>
          <LOL>LOL</LOL>
        </Button>
      </Form>
      {open && getUser.length > 0 && (
        <AutoBox size={size} home={home}>
          {getUser?.map((user: any) => (
            <EachUser key={user.username}>
              <EachUserInfo
                onMouseDown={(event) => handleRecommend(user, event)}
              >
                <UserServer>{user.server}</UserServer>
                <Username>{user.username}</Username>
              </EachUserInfo>
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
    </FormBox>
  );
};
