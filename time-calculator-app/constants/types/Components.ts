import {Text as DefaultText, TextInputProps, TextStyle, TouchableOpacityProps, View as DefaultView} from "react-native";
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
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type CustomButtonProps = TouchableOpacityProps & ThemeProps & ButtonProps
export type CustomUserInputProps = TextInputProps & ThemeProps