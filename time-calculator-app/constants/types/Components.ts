import {Text as DefaultText, TextInputProps, TextStyle, TouchableOpacityProps, View as DefaultView} from "react-native";
import {ConvertedTimezoneApiResponse} from "./api";
import {CoordInfo} from "./TimezoneStore";
type ThemeProps = {
  background?: {
    lightColor?: string;
    darkColor?: string;
  },
  border?: {
    lightColor?: string;
    darkColor?: string;
  }
};

type ButtonProps = {
  buttonText: string;
  buttonTextStyle?: TextStyle
  textColor?: TextStyle
}
export type MainContentProps = ConvertedTimezoneApiResponse & CoordInfo & {isLoading: boolean}
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type CustomButtonProps = TouchableOpacityProps & ThemeProps & ButtonProps
export type CustomUserInputProps = TextInputProps & ThemeProps