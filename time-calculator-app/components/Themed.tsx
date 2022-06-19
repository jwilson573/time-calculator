/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  TouchableOpacityProps,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  StyleSheet,
  Dimensions, TextStyle, TextInput, KeyboardTypeOptions, TextInputProps
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import React from "react";
const screen = Dimensions.get("window")

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function getTheme() {
  const theme = useColorScheme()
  return Colors[theme]
}

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
type CustomButtonProps = TouchableOpacityProps & ThemeProps & ButtonProps
type CustomUserInputProps = TextInputProps & ThemeProps

export function Text(props: TextProps) {
  const { style, background, ...otherProps } = props;
  const color = useThemeColor({ light: background?.lightColor, dark: background?.darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, background, ...otherProps } = props;
  const backgroundColor = useThemeColor({
    light: background?.lightColor,
    dark: background?.darkColor },
    'background'
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: CustomButtonProps) {
  const { style, background, border, onPress, buttonText, buttonTextStyle, textColor, ...otherProps } = props
  const backgroundColor = useThemeColor({light: background?.lightColor, dark: background?.darkColor}, "background")
  const borderColor = useThemeColor({light: border?.lightColor, dark: border?.darkColor}, "borderColor")
  return (
    <DefaultTouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor, borderColor }, style]}
      {...otherProps}
    >
      <Text style={[buttonTextStyle || styles.buttonText, textColor]}>{buttonText}</Text>
    </DefaultTouchableOpacity>
  );
}

export function UserInput(props: CustomUserInputProps) {
  const { background, border, style, onChangeText, value, placeholder, keyboardType, ...otherProps } = props
  const backgroundColor = useThemeColor({light: background?.lightColor, dark: background?.darkColor}, "background")
  const borderColor = useThemeColor({light: border?.lightColor, dark: border?.darkColor}, "borderColor")
  const textColor = useThemeColor({light: border?.lightColor, dark: border?.darkColor}, "text")
  return (
    <TextInput
      style={[style || styles.input, {backgroundColor, borderColor, color: textColor}]}
      onChangeText={(text) => {
        if (onChangeText) {
          onChangeText(text)
        }
      }}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType || "default"}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    height: screen.height * 0.08,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 5
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 22
  },
  input: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#262626",
    height: 50,
    padding: 5
  }
})