import { StyleSheet } from 'react-native'
import {Button, Text, View} from '../components/shared-components'
import React, {useContext} from "react"
import {TouchableOpacity} from "react-native"
import {observer} from "mobx-react"
import {StoreContext} from "../app-stores"
import {NativeStackScreenProps} from "@react-navigation/native-stack/src/types"
import {PreviousEntry} from "../constants/types/index"

type PreviousEntriesProps = {

}

export const PreviousEntries: React.FC<NativeStackScreenProps<PreviousEntriesProps>> = observer(({navigation}) => {
    const {timeZoneStore} = useContext(StoreContext)
    const previousEntries = timeZoneStore.previousEntries
    const onPressHandler = (entry: PreviousEntry) => {
      timeZoneStore.userCoordinates = {lat: entry.lat, lng: entry.lng}
      timeZoneStore.getTimeUTCFromApi()
      navigation.goBack()
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous 10 Searches</Text>
      <Text style={{marginBottom: 10, width: "75%", textAlign: "center"}}>
        Press one of your previous results to recheck the time!
      </Text>
      <View style={{flex: 1, width: "100%"}}>
        {
          previousEntries?.length > 0 && previousEntries.map((entry, index) => {
            return (
              <TouchableOpacity onPress={() => onPressHandler(entry)} key={index} style={{marginBottom: 5, paddingVertical: 5}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={{marginRight: 10, flex: 0.65}}>{entry?.city}, {entry?.state || entry?.timeZone}</Text>
                  <Text style={{flex: 0.35}}>Time: {entry?.time}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        <View style={{flexDirection: "row", marginTop: 20}}>
          <Button
            textColor={{color: "#fff"}}
            onPress={() => timeZoneStore.clearPreviousEntries()}
            buttonText={"Clear"}
          />
        </View>
      </View>
    </View>
  );
}
)
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
    marginVertical: 15
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
