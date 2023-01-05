import citiesRaw from './cities.json'

let cities = []

export function getAllCity() {
  if (cities) return cities
  cities = JSON.parse(citiesRaw)
  return cities
}