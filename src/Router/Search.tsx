import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { langState, resizeState } from "../util/atom";
import { useTranslation } from "react-i18next";
import i18next from "../lang/i18n";

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
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
`;
const Overlay = styled.div`
  position: absolute;
  width: 90%;
  height: 85%;
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
const ContentInput = styled.input`
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  padding: 15px 25px;
  padding-left: 70px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
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
const SubTitle = styled.h2`
  position: absolute;
  font-size: 9px;
  top: 2px;
  font-weight: 700;
  color: darkgray;
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
const LangSel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 5px;
`;
const LangSelect = styled(Select)`
  background-color: transparent;
`;

export const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onValid = (data: any) => {
    if (data === "") {
      return;
    }
    navigate(`/summoner/?username=${data.username}`);
  };
  const size = useRecoilValue(resizeState);
  const { t } = useTranslation();
  const handleChange = (event: any) => {
    const lang = event?.target.value;
    i18next.changeLanguage(lang);
    setLang(lang);
  };
  const setLang = useSetRecoilState(langState);
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
          <SubTitle>Region</SubTitle>
          <Select name="lang">
            <Option value="ko">KR</Option>
            <Option value="en">EN</Option>
            <Option value="jp">JP</Option>
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
            placeholder={t("inputPlaceholder")}
          />
          <Button>
            <LOL>LOL</LOL>
          </Button>
        </Form>
      </FormBox>
      <LangSel>
        <LangSelect onChange={handleChange} name="lang">
          <Option value="ko">KOREAN</Option>
          <Option value="en">ENGLISH</Option>
          <Option value="jp">JAPANESE</Option>
        </LangSelect>
      </LangSel>
    </HomeBox>
  );
};
