import {makeObservable, get, set, toJS, observable, runInAction} from "mobx"
import {persist} from "mobx-persist"
import {timeZoneApi} from "../app-apis/time-zone-api"
import {ConvertedTimezoneApiResponse, tzConverter} from "../app-apis/api-converters/time-zone-converter"
import * as Location from "expo-location"
import {RootStore} from "./index"
export type CoordInfo = {
    lat: string
    lng: string
}
interface ITimeZoneStore {
    getTimeUTCFromApi(): void
}
export type PreviousEntry = ConvertedTimezoneApiResponse & CoordInfo

export class TimeZoneStore implements ITimeZoneStore{
  @persist("object") _userCoordinates: CoordInfo = {lat: "", lng: ""}
  @persist("object") _timeZoneData: ConvertedTimezoneApiResponse = {
    city: "",
    country: "",
    timeZone: "",
    time: "",
    state: ""
  }
  @persist("list") _previousEntries: PreviousEntry[] = []

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      _timeZoneData: observable,
      _userCoordinates: observable,
      _previousEntries: observable
    })
  }

  set userCoordinates({lat, lng}){
    runInAction(() => this._userCoordinates = {lat, lng})
  }

  get userCoordinates(): CoordInfo {
    return toJS(this._userCoordinates)
  }

  get previousEntries() {
    return toJS(this._previousEntries)
  }

  get tzData(): ConvertedTimezoneApiResponse {
    return toJS(this._timeZoneData)
  }

  private setTimeZoneData = (data: ConvertedTimezoneApiResponse): void => {
    runInAction(() => this._timeZoneData = data)
  }

  private setPreviousEntries(entry: PreviousEntry) {
    runInAction(() => {
      this._previousEntries.unshift(entry)
      if (this._previousEntries.length > 10) {
        this._previousEntries.pop()
      }
    })
  }

  public getTimeUTCFromApi = (coordinates = this.userCoordinates) => {
    timeZoneApi.getTimeUTCFromApi(coordinates)
      .then(resp => {
        if (resp?.data) {
          const data: ConvertedTimezoneApiResponse = tzConverter.convertTimeAPIResponse(resp.data)
          const previousEntry: PreviousEntry = Object.assign({}, data, this.userCoordinates)
          this.setTimeZoneData(data)
          this.setPreviousEntries(previousEntry)
        }
      })
      .catch(error => {
          console.log(error, "error fetching time from api")
      })

  }
  public fetchUserLocation = () => {
    Location.requestForegroundPermissionsAsync().then(resp => {
      if (resp?.granted) {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
          (location) => {
            this.userCoordinates = {
              lat: location?.coords?.latitude?.toString(),
              lng: location?.coords?.longitude?.toString()
            }
          }
        ).then(_ => {
          this.getTimeUTCFromApi()
        })
      }
    })
      .catch(err => {
        console.log(err, "location permission failed")
      })
  }

  public clearResults = () => {
    this.userCoordinates = {lat: "", lng: ""}
    this.setTimeZoneData({
      city: "",
      state: "",
      time: "",
      timeZone: "",
      country: ""
    })
  }

  public clearPreviousEntries = () => {
    runInAction(() => this._previousEntries = [])
  }

}