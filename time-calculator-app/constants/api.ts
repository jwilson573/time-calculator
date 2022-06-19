import {CoordInfo} from "../app-stores/time-zone-store"

export const TIME_ZONE_API = "/get-time-zone"
export interface ITimeZoneApi {
    getTimeUTCFromApi(data: CoordInfo): Promise<any>
}