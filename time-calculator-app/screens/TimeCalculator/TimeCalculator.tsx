import React, {useContext, useState, useEffect} from "react"
import {StyleSheet, ActivityIndicator} from 'react-native'
import {observer} from "mobx-react"
import {Text, View, Button, UserInput} from '../../components/shared-components'
import {StoreContext} from "../../app-stores"
import {validations} from "../../app-utils/validations"
import {useTheme} from "@react-navigation/native"
import {MainContentProps, CoordInfo, CustomTheme} from "../../constants/types"
import styles from "./styles/index"

//@ts-ignore
const tcStyles = StyleSheet.create(styles)

const MainContent: React.FC<MainContentProps> = (props: MainContentProps) => {
  const {city, country, time, lat, lng, state, isLoading} = props
  if (isLoading) {
    return <ActivityIndicator size={"large"}/>
  }
  if (time && city && country && lat && lng) {
    return (
      <View>
        <Text style={tcStyles.title}>{city}, {state}</Text>
        <Text style={tcStyles.alignSelfCenter}>{country}</Text>
        <Text style={[tcStyles.font40, tcStyles.fontBold, tcStyles.alignSelfCenter]}>{time}</Text>
        <View style={[tcStyles.flexRow, tcStyles.justifyCenter]}>
          <Text style={tcStyles.marginRight10}>Latitude: {lat}</Text>
          <Text>Longitude: {lng}</Text>
        </View>
      </View>
    )
  }
  return null
}

export const TimeCalculator: React.FC = observer((_) => {
  const {timeZoneStore} = useContext(StoreContext)
  const {colors} = useTheme() as CustomTheme
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean | null>(true)
  const {city, country, time, timeZone, state} = timeZoneStore.tzData
  const coordinates = timeZoneStore.userCoordinates

  const handleSubmit = (data: CoordInfo) => {
    if (validations.validateCoordinates(data)) {
      timeZoneStore.userCoordinates = data
      timeZoneStore.getTimeUTCFromApi()
      setLongitude("")
      setLatitude("")
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }
  const clearResults = () => {
    timeZoneStore.clearResults()
    setLongitude("")
    setLatitude("")
    setIsValid(true)
  }
  return (
    <View style={[tcStyles.container]}>
      <MainContent
        isLoading={timeZoneStore.isAppLoading}
        city={city}
        time={time}
        state={state}
        country={country}
        timeZone={timeZone}
        lat={coordinates.lat}
        lng={coordinates.lng}
      />
      <View style={[tcStyles.widthFull, tcStyles.marginBottom10, tcStyles.marginTop20, tcStyles.transparentBG]}>
        <View style={[tcStyles.flexRow, tcStyles.transparentBG]}>
          <UserInput
            onChangeText={(lat: string) => setLatitude(lat)}
            style={[!isValid ? {borderColor: colors?.error }: undefined, tcStyles.marginRight5]}
            value={latitude}
            keyboardType={"numbers-and-punctuation"}
            placeholder={"Enter Latitude"}
          />
          <UserInput
            onChangeText={(long: string) => setLongitude(long)}
            style={!isValid ? {borderColor: colors?.error }: undefined}
            value={longitude}
            keyboardType={"numbers-and-punctuation"}
            placeholder={"Enter Longitude"}
          />
        </View>
        {!isValid ?
          <Text style={[tcStyles.centerText, tcStyles.marginTop2, {color: colors?.error}]}>
            Please enter valid coordinates
          </Text>
          : null
        }
      </View>
      <View style={tcStyles.flexRow}>
      <Button
        style={tcStyles.marginVertical10}
        textColor={tcStyles.whiteFC}
        onPress={() => handleSubmit({lat: latitude, lng: longitude})}
        buttonText={"Submit"}
      />
      </View>
      <View style={tcStyles.flexRow}>
        <Button
          style={tcStyles.marginRight5}
          textColor={tcStyles.whiteFC}
          onPress={() => clearResults()}
          buttonText={"Reset"}
        />
        {/* If running in simulator, please verify your custom location in Features > Location. If set to "None",
         it will take some time for the location to be returned. However, it will still update.*/}
        <Button
          textColor={tcStyles.whiteFC}
          onPress={() => {
            timeZoneStore.fetchUserLocation().then(_ => {
              setIsValid(true)
            }).catch(err => {
              console.log("Error fetching user coordinates", err)
              setIsValid(false)
            })
          }}
          buttonText={"Get Local Time"}
        />
      </View>
    </View>
  )
})

