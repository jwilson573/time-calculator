import {CoordInfo} from "../constants/types/index"

interface ValidationInterface {
  validateCoordinates: (coordinates: CoordInfo) => boolean
}

class Validations implements ValidationInterface{
  public validateCoordinates = ({lat, lng}: CoordInfo) => {
    const latPattern = new RegExp(/^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/)
    const lngPattern = new RegExp(/^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/)
    return latPattern.test(lat) && lngPattern.test(lng)
  }
}

export const validations = new Validations()