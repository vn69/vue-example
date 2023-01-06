import { removeVietnameseTones } from '../function'
import citiesRaw from './cities.json'
import districtsRaw from './districts.json'
import wardsRaw from './wards.json'

export function getListCity() {
  return citiesRaw.map(item => {
    item.textSearch = removeVietnameseTones(item.name).toLowerCase() 
    return item
  }).sort((a,b) => a.code - b.code)
}

export function getListDistrict(cityCode) {
  if(cityCode) {
    let result = []
  
    result = districtsRaw.filter(item => item.parent_code == cityCode)
    result = result.map(item => {
      item.textSearch = removeVietnameseTones(item.name).toLowerCase() 
      return item
    }).sort((a,b) => a.code - b.code)
    return result
  } else return []
}

export function getListWard(districtCode) {
  if(districtCode) {
    let result = []
  
    result = wardsRaw.filter(item => item.parent_code == districtCode)
    result = result.map(item => {
      item.textSearch = removeVietnameseTones(item.name).toLowerCase() 
      return item
    }).sort((a,b) => a.code - b.code)
    return result
  } else return []
}