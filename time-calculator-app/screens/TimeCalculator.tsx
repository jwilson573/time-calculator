import React, {useContext, useEffect, useLayoutEffect, useState} from "react"
import {StyleSheet, TouchableOpacity} from 'react-native'
import {observer} from "mobx-react"
import {Text, View, Button, UserInput} from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import {StoreContext} from "../app-stores/";
import {CoordInfo, PreviousEntry} from "../app-stores/time-zone-store";
import {ConvertedTimezoneApiResponse} from "../app-apis/api-converters/time-zone-converter";

type MainContentProps = ConvertedTimezoneApiResponse & CoordInfo
const MainContent: React.FC<MainContentProps> = (props: MainContentProps) => {
  const {city, country, time, lat, lng, state} = props
  console.log(props, "props")
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

export const TimeCalculator: React.FC = observer((props: any) => {
  const {timeZoneStore} = useContext(StoreContext)
  const [latitude, setLatitude] = useState(timeZoneStore.userCoordinates.lat)
  const [longitude, setLongitude] = useState(timeZoneStore.userCoordinates.lng)
  const {city, country, time, timeZone, state} = timeZoneStore.tzData
  const coordinates = timeZoneStore.userCoordinates

  const handleSubmit = (data: CoordInfo) => {
    timeZoneStore.userCoordinates = data
    timeZoneStore.getTimeUTCFromApi()
    setLongitude("")
    setLatitude("")
  }
  const clearResults = () => {
    timeZoneStore.clearResults()
  }
  return (
    <View style={[styles.container]}>
      <MainContent
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
            background={{lightColor: "#fff", darkColor: "#777"}}
            value={latitude}
            placeholder={"Enter Latitude"}
          />
          <UserInput
            onChangeText={(long: string) => setLongitude(long)}
            background={{lightColor: "#fff", darkColor: "#777"}}
            value={longitude}
            placeholder={"Enter Longitude"}
          />
        </View>
      </View>
      <View style={{flexDirection: "row"}}>
      <Button
        background={{lightColor:"#4185cb", darkColor: "#172e48"}}
        border={{lightColor: "#f5f5f5", darkColor: "#a0bbd9"}}
        textColor={{color: "#fff"}}
        onPress={() => handleSubmit({lat: latitude, lng: longitude})}
        buttonText={"Submit"}
      />
      </View>
      <View style={{flexDirection: "row"}}>
        <Button
          background={{lightColor:"#4185cb", darkColor: "#172e48"}}
          border={{lightColor: "#f5f5f5", darkColor: "#a0bbd9"}}
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
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
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
});
