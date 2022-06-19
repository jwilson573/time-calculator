import {CoordInfo} from "../app-stores/time-zone-store"
import axios from "axios"
import {ITimeZoneApi, TIME_ZONE_API} from "../constants/api"


class TimeZoneApi implements ITimeZoneApi {
    private _baseUrl: string = "http://api.timezonedb.com/v2.1"

    public getTimeUTCFromApi = (data: CoordInfo ) => {
        return axios.get(`${this._baseUrl}${TIME_ZONE_API}`, {params: {
            key: "E83NQMQ2HDWU",
            format: "json",
            by: "position",
            lat: data?.lat || "0",
            lng: data?.lng || "0"
            }})
    }
}

const timeZoneApi: TimeZoneApi = new TimeZoneApi()
export {timeZoneApi}