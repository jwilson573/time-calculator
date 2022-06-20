import { StyleSheet } from 'react-native'
import {Button, Text, View} from '../../components/shared-components'
import React, {useContext} from "react"
import {TouchableOpacity} from "react-native"
import {observer} from "mobx-react"
import {StoreContext} from "../../app-stores"
import {NativeStackScreenProps} from "@react-navigation/native-stack/src/types"
import {PreviousEntry} from "../../constants/types"
import styles from "./styles"

//@ts-ignore
const peStyles = StyleSheet.create(styles)

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
    <View style={peStyles.container}>
      <Text style={[peStyles.title, peStyles.marginTop20]}>Previous 10 Searches</Text>
      <Text style={[peStyles.marginBottom10, peStyles.width75p, peStyles.centerText]}>
        Press one of your previous results to recheck the time!
      </Text>
      <View style={[peStyles.flex100, peStyles.widthFull]}>
        {
          previousEntries?.length > 0 && previousEntries.map((entry, index) => {
            return (
              <TouchableOpacity onPress={() => onPressHandler(entry)} key={index} style={[peStyles.marginBottom5, peStyles.paddingVertical5]}>
                <View style={[peStyles.flexRow, peStyles.justifySpaceBetween]}>
                  <Text style={[peStyles.marginRight10, peStyles.flex65]}>{entry?.city}, {entry?.state || entry?.timeZone}</Text>
                  <Text style={peStyles.flex35}>Time: {entry?.time}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        <View style={[peStyles.flexRow, peStyles.marginTop20]}>
          <Button
            textColor={peStyles.whiteFC}
            onPress={() => timeZoneStore.clearPreviousEntries()}
            buttonText={"Clear"}
          />
        </View>
      </View>
    </View>
  )
}
)
