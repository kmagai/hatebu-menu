import WeatherAPI from '../model/weather_api'
import _ from 'lodash'
import async from 'async'

const weather = require('request').defaults({
  url: 'http://api.openweathermap.org/data/2.5/weather',
  json: true
});

export default class WeatherAPI {
  constructor (cities) {
    this.cities = cities
    this.weathers = {}
  }
  
  fetch_all () {
    async.map(this.cities, fetch)
  }
  
  private fetch (city) {
    // use cache to return value if possible
    weather.get({q: {city}}, function (error, weatherResponse, body) {
      console.log(body);
      if (error) return callback(error);
    })
  }
}