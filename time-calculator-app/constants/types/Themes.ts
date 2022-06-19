import {Theme} from "@react-navigation/native";

export interface CustomTheme extends Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    errorBorder: string
    ctaButton: string
  };
};