import {makeObservable, get, set, toJS, observable, runInAction} from "mobx"
import {persist} from "mobx-persist"
import {timeZoneApi} from "../app-apis/time-zone-api"
import {tzConverter} from "../app-apis/api-converters/time-zone-converter"
import * as Location from "expo-location"
import {RootStore} from "./index"
import {LocationObject} from "expo-location";
import {CoordInfo, PreviousEntry, TimeZoneStoreInterface} from "../constants/types/TimezoneStore"
import {ConvertedTimezoneApiResponse} from "../constants/types/index"


export class TimeZoneStore implements TimeZoneStoreInterface{
  @persist("object") _userCoordinates: CoordInfo = {lat: "", lng: ""}
  @persist("object") _timeZoneData: ConvertedTimezoneApiResponse = {
    city: "",
    country: "",
    timeZone: "",
    time: "",
    state: ""
  }
  @persist("list") _previousEntries: PreviousEntry[] = []
  _isAppLoading: boolean = false
  constructor(rootStore: RootStore) {
    makeObservable(this, {
      _timeZoneData: observable,
      _userCoordinates: observable,
      _previousEntries: observable,
      _isAppLoading: false,
      }
    )
  }

  set userCoordinates({lat, lng}){
    runInAction(() => this._userCoordinates = {lat, lng})
  }

  get userCoordinates(): CoordInfo {
    return toJS(this._userCoordinates)
  }

  get previousEntries(): PreviousEntry[] {
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

  set isAppLoading(flag: boolean){
    runInAction(() => this._isAppLoading = flag)
  }
  get isAppLoading(): boolean{
    return toJS(this._isAppLoading)
  }

  public getTimeUTCFromApi = (coordinates = this.userCoordinates) => {
    this.isAppLoading = true
    timeZoneApi.getTimeUTCFromApi(coordinates)
      .then(resp => {
        this.isAppLoading = false
        if (resp?.data) {
          const data: ConvertedTimezoneApiResponse = tzConverter.convertTimeAPIResponse(resp.data)
          const previousEntry: PreviousEntry = Object.assign({}, data, this.userCoordinates)
          this.setTimeZoneData(data)
          this.setPreviousEntries(previousEntry)
        }
      })
      .catch(error => {
        this.isAppLoading = false
          console.log(error, "error fetching time from api")
      })

  }
  public fetchUserLocation = async() => {
    let { granted } = await Location.requestForegroundPermissionsAsync()
    if (granted) {
      this.isAppLoading = true
      const location: LocationObject = await Location.getCurrentPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
        )
      this.userCoordinates = {
        lat: location?.coords?.latitude?.toString(),
        lng: location?.coords?.longitude?.toString()
      }
      if (this.userCoordinates.lat?.length && this.userCoordinates.lng?.length) {
        this.getTimeUTCFromApi(this.userCoordinates)
      }
      this.isAppLoading = false
    }

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