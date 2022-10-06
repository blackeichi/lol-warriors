import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import i18next from "../lang/i18n";
import { langState } from "../util/atom";

const LangSel = styled.div`
  position: fixed;
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
`;
const LangSelec = styled(Select)`
  background-color: transparent;
  font-family: "MonoplexKR-Regular";
`;

export const LangSelect: React.ReactElement = (fixed) => {
  const setLang = useSetRecoilState(langState);
  const handleChange = (event: any) => {
    const lang = event?.target.value;
    i18next.changeLanguage(lang);
    setLang(lang);
  };
  return (
    <LangSel>
      <LangSelec onChange={handleChange}>
        <Option value="ko">한국어</Option>
        <Option value="en">ENGLISH</Option>
        <Option value="jp">日本語</Option>
      </LangSelec>
    </LangSel>
  );
};
