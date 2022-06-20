import commonStyles from "../../app-styles/common-styles"

export default {
  ...commonStyles,
  button: {
    borderWidth: 1,
    height: commonStyles.screenHeight.height * 0.08,
    ...commonStyles.flex100,
    ...commonStyles.borderRadius10,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignItemsCenter,
    ...commonStyles.overflowHidden,
    ...commonStyles.marginBottom5
  },
  buttonText: {
    ...commonStyles.fontBold,
    ...commonStyles.font22
  },
  input: {
    borderWidth: 1,
    height: 50,
    ...commonStyles.flex100,
    ...commonStyles.borderRadius10,
    ...commonStyles.padding5
  }
}