import commonStyles from "../../../app-styles/common-styles"

export default {
  ...commonStyles,
  container: {
    ...commonStyles,
    ...commonStyles.flex100,
    ...commonStyles.alignItemsCenter,
    ...commonStyles.justifyCenter,
    ...commonStyles.padding5
  },
  error: {
    borderColor: "red",
    color: "red"
  },
  title: {
    ...commonStyles.font20,
    ...commonStyles.fontBold,
    ...commonStyles.centerText
  }
}