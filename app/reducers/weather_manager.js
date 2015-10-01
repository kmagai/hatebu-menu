import _ from 'lodash'
import Events from 'events'
import WeatherAPI from '../model/weather_api'

const POLLING_INTERVAL = 3600000; // 1 hour

export default class WeatherManager extends Events.EventEmitter {
  // enable cache for notification later
  // constructor (cache) {
  constructor () {
    super()
    this.weathers = {}
  }
  
  fetch (cities, callback) {
    var weatherAPI = new WeatherAPI(cities)
    
    var success = function() {
      self.emit('weather-updated', new_weathers)
      self.weathers[city] = new_weathers
    }
    var error = function() {}
    
    weatherAPI.fetch_all(cities, success, error)
  }
}
