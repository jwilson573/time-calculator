import {ConvertedTimezoneApiResponse, TimezoneApiConverter} from "../../constants/types/index"

const { DateTime } = require("luxon")

class TimeZoneConverter implements TimezoneApiConverter{

  // Takes the epoch time from the api response and uses the Luxon library to convert to local time.
  private _convertTimeStamp = (time: number, zoneName: string, offset: number): string => {
    if (time && zoneName && offset) {
      return DateTime.fromSeconds(time - offset, {zone: zoneName})
        .toLocaleString({
          hour: "numeric",
          minute: "numeric"
        })
    }
    return ""
  }

  public convertTimeAPIResponse = (data: any): ConvertedTimezoneApiResponse => {
    return {
      city: data?.cityName,
      time: this._convertTimeStamp(data?.timestamp, data?.zoneName, data?.gmtOffset),
      state: data?.regionName,
      country: data?.countryName,
      timeZone: data?.zoneName
    }
  }
}

export const tzConverter: TimeZoneConverter = new TimeZoneConverter()
