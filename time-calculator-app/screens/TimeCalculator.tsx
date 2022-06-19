import React, {useContext, useState} from "react"
import {StyleSheet, ActivityIndicator} from 'react-native'
import {observer} from "mobx-react"
import {Text, View, Button, UserInput} from '../components/shared-components'
import {StoreContext} from "../app-stores/"
import {validations} from "../app-utils/validations"
import {useTheme} from "@react-navigation/native"
import {ConvertedTimezoneApiResponse, CoordInfo, CustomTheme} from "../constants/types/index"

type MainContentProps = ConvertedTimezoneApiResponse & CoordInfo & {isLoading: boolean}
const MainContent: React.FC<MainContentProps> = (props: MainContentProps) => {
  const {city, country, time, lat, lng, state, isLoading} = props
  if (isLoading) {
    return <ActivityIndicator size={"large"}/>
  }
  if (time && city && country && lat && lng) {
    return (
      <View>
        <Text style={styles.title}>{city}, {state}</Text>
        <Text style={{alignSelf: "center"}}>{country}</Text>
        <Text style={{fontSize: 40, fontWeight: "bold", alignSelf: "center"}}>{time}</Text>
        <View style={{flexDirection: "row"}}>
          <Text style={{marginRight: 10}}>Latitude: {lat}</Text>
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
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const {city, country, time, timeZone, state} = timeZoneStore.tzData
  const coordinates = timeZoneStore.userCoordinates
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
    <View style={[styles.container]}>
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
      <View style={{width: "100%", marginBottom: 10, marginTop: 20, backgroundColor: "transparent"}}>
        <View style={{flexDirection: "row", backgroundColor: "transparent"}}>
          <UserInput
            onChangeText={(lat: string) => setLatitude(lat)}
            style={[!isValid ? {borderColor: colors?.errorBorder }: undefined, {marginRight: 5}]}
            value={latitude}
            placeholder={"Enter Latitude"}
          />
          <UserInput
            onChangeText={(long: string) => setLongitude(long)}
            style={!isValid ? {borderColor: colors?.errorBorder }: undefined}
            value={longitude}
            placeholder={"Enter Longitude"}
          />
        </View>
      </View>
      <View style={{flexDirection: "row"}}>
      <Button
        style={{marginVertical: 10}}
        textColor={{color: "#fff"}}
        onPress={() => handleSubmit({lat: latitude, lng: longitude})}
        buttonText={"Submit"}
      />
      </View>
      <View style={{flexDirection: "row"}}>
        <Button
          style={{marginRight: 5}}
          textColor={{color: "#fff"}}
          onPress={() => clearResults()}
          buttonText={"Reset"}
        />
        {/* If running in simulator, please make sure you aren't using a custom location in Features > Location */}
        <Button
          background={{lightColor:"#4185cb", darkColor: "#172e48"}}
          border={{lightColor: "#f5f5f5", darkColor: "#a0bbd9"}}
          textColor={{color: "#fff"}}
          onPress={() => timeZoneStore.fetchUserLocation()}
          buttonText={"Get Local Time"}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  error: {
    borderColor: "red",
    color: "red"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
