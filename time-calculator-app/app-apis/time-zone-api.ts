import {CoordInfo} from "../constants/types"
import axios from "axios"
import {TimeZoneApiInterface} from "../constants/types/"
import {GET_TIME_ZONE} from "../constants/time-zone/Api";


class TimeZoneApi implements TimeZoneApiInterface {
    private _baseUrl: string = "http://api.timezonedb.com/v2.1"

    public getTimeUTCFromApi = (data: CoordInfo ) => {
        return axios.get(`${this._baseUrl}${GET_TIME_ZONE}`, {params: {
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