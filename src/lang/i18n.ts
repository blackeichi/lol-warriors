import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEn from "./lang.en.json";
import langKo from "./lang.ko.json";
import langJp from "./lang.jp.json";
const getLang = window.localStorage.getItem("Lang");
const parsedLang = JSON.parse(getLang as string);

const resource = {
  en: {
    translations: langEn,
  },
  ko: {
    translations: langKo,
  },
  jp: {
    translations: langJp,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: parsedLang ? parsedLang : "ko",
  fallbackLng: parsedLang ? parsedLang : "ko",
  debug: true,
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
