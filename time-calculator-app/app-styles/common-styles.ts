import {Dimensions} from "react-native"

const screen = Dimensions.get("window")

export default {
  alignItemsCenter: {
    alignItems: "center"
  },
  alignSelfCenter: {
    alignSelf: "center"
  },
  borderRadius10: {
    borderRadius: 10
  },
  centerText: {
    textAlign:  "center"
  },
  flex65: {
    flex: 0.65
  },
  flex35: {
    flex: 0.35
  },
  flex100: {
    flex: 1
  },
  flexRow: {
    flexDirection: "row"
  },
  fontBold: {
    fontWeight: "bold"
  },
  font20: {
    fontSize: 20
  },
  font22: {
    fontSize: 22
  },
  font40: {
    fontSize: 40
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifySpaceBetween: {
    justifyContent: "space-between"
  },
  marginRight5: {
    marginRight: 5
  },
  marginRight10: {
    marginRight: 10
  },
  marginBottom5: {
    marginBottom: 5
  },
  marginBottom10: {
    marginBottom: 10
  },
  marginTop2: {
    marginTop: 2
  },
  marginTop20: {
    marginTop: 20
  },
  marginVertical10: {
    marginVertical: 10
  },
  overflowHidden: {
    overflow: "hidden"
  },
  padding5: {
    padding: 5
  },
  paddingVertical5: {
    paddingVertical: 5
  },
  screenHeight: {
    height: screen.height
  },
  screenWidth: {
    width: screen.width
  },
  transparentBG: {
    backgroundColor: "transparent"
  },
  width75p: {
    width: "75%"
  },
  widthFull: {
    width: "100%"
  },
  whiteFC: {
    color: "#FFF"
  }
}