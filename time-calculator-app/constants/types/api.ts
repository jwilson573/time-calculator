import {CoordInfo} from "./index"

export interface TimeZoneApiInterface {
    getTimeUTCFromApi(data: CoordInfo): Promise<any>
}
export type ConvertedTimezoneApiResponse = {
    city: string
    time: string
    country: string
    timeZone: string
    state: string
}

export interface TimezoneApiConverter {
    convertTimeAPIResponse(data: any): ConvertedTimezoneApiResponse
}