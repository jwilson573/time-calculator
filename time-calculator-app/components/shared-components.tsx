/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native'

import React from "react"
import {useTheme} from "@react-navigation/native"
import {CustomTheme} from "../constants/types/"
import {CustomButtonProps, CustomUserInputProps, TextProps, ViewProps} from "../constants/types/"
const screen = Dimensions.get("window")

export function Text(props: TextProps) {
  const { style, background, ...otherProps } = props;
  const {colors} = useTheme()
  return <DefaultText style={[{ color: colors?.text }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, background, ...otherProps } = props
  const {colors} = useTheme() as CustomTheme
  return <DefaultView style={[{ backgroundColor: colors?.background }, style]} {...otherProps} />
}

export function Button(props: CustomButtonProps) {
  const { style, background, border, onPress, buttonText, buttonTextStyle, textColor, ...otherProps } = props
  const {colors} = useTheme() as CustomTheme
  return (
    <DefaultTouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors?.ctaButton, borderColor: colors?.border }, style]}
      {...otherProps}
    >
      <Text style={[styles.buttonText, textColor, buttonTextStyle]}>{buttonText}</Text>
    </DefaultTouchableOpacity>
  )
}

export function UserInput(props: CustomUserInputProps) {
  const { background, border, style, onChangeText, value, placeholder, keyboardType, ...otherProps } = props
  const {colors} = useTheme()
  return (
    <TextInput
      style={[styles.input,
        {
          backgroundColor: colors?.card,
          borderColor: colors?.border,
          color: colors?.text
        },
        style
      ]}
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
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    padding: 5
  }
})