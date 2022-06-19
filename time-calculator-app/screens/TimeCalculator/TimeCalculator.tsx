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
        <View style={tcStyles.flexRow}>
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
  const [latitude, setLatitude] = useState<string>(timeZoneStore.userCoordinates.lat)
  const [longitude, setLongitude] = useState<string>(timeZoneStore.userCoordinates.lng)
  const [isValid, setIsValid] = useState<boolean | null>(true)
  const {city, country, time, timeZone, state} = timeZoneStore.tzData
  const coordinates = timeZoneStore.userCoordinates

  useEffect(() => {
    setLatitude(timeZoneStore.userCoordinates.lat)
    setLongitude(timeZoneStore.userCoordinates.lng)
  }, [timeZoneStore.userCoordinates])

  const handleSubmit = (data: CoordInfo) => {
    if (validations.validateCoordinates(data)) {
      timeZoneStore.userCoordinates = data
      timeZoneStore.getTimeUTCFromApi()
      setLongitude("")
      setLatitude("")
    } else {
      setIsValid(false)
    }
  }
  const clearResults = () => {
    timeZoneStore.clearResults()
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
            placeholder={"Enter Latitude"}
          />
          <UserInput
            onChangeText={(long: string) => setLongitude(long)}
            style={!isValid ? {borderColor: colors?.error }: undefined}
            value={longitude}
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
        {/* If running in simulator, please make sure you aren't using a custom location in Features > Location */}
        <Button
          textColor={tcStyles.whiteFC}
          onPress={() => timeZoneStore.fetchUserLocation()}
          buttonText={"Get Local Time"}
        />
      </View>
    </View>
  )
})

