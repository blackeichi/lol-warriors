import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import i18next from "../lang/i18n";
import { langState } from "../util/atom";

const LangSel = styled.div<{ size: string; home: boolean }>`
  position: ${(props) =>
    props.size !== "Mobile" && props.home === false ? "static" : "fixed"};
  top: 0;
  right: 0;
  margin: 5px;
`;
const Select = styled.select`
  font-size: 15px;
  font-weight: bold;
`;
const Option = styled.option`
  font-size: 15px;
  font-weight: bold;
  background-color: ${(props) => props.theme.bgColr};
`;
const LangSelec = styled(Select)`
  background-color: transparent;
  font-family: "MonoplexKR-Regular";
`;

type Interface = {
  home: boolean;
  size?: string;
};

export const LangSelect: React.FC<Interface> = ({ home, size = "Web" }) => {
  const [lang, setLang] = useRecoilState(langState);
  const handleChange = (event: any) => {
    const lang = event?.target.value;
    i18next.changeLanguage(lang);
    localStorage.setItem("Lang", JSON.stringify(lang));
    setLang(lang);
  };
  return (
    <LangSel home={home} size={size}>
      <LangSelec defaultValue={lang} onChange={handleChange}>
        <Option value="ko">한국어</Option>
        <Option value="en">ENGLISH</Option>
        <Option value="jp">日本語</Option>
      </LangSelec>
    </LangSel>
  );
};
