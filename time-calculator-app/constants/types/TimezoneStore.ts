import {ConvertedTimezoneApiResponse} from "./index";

export type CoordInfo = {lat: string; lng: string}
export interface TimeZoneStoreInterface {
  getTimeUTCFromApi(): void
}
export type PreviousEntry = ConvertedTimezoneApiResponse & CoordInfo