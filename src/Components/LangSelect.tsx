import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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
    setLang(lang);
  };
  console.log(lang);
  return (
    <LangSel home={home} size={size}>
      <LangSelec onChange={handleChange}>
        <Option value="ko" selected={lang === "ko" && true}>
          한국어
        </Option>
        <Option value="en" selected={lang === "en" && true}>
          ENGLISH
        </Option>
        <Option value="jp" selected={lang === "jp" && true}>
          日本語
        </Option>
      </LangSelec>
    </LangSel>
  );
};
