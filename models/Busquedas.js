require('dotenv').config()
const { default: axios } = require('axios')
const { writeDB } = require('../helpers/readWriteDB')

class Busquedas {
  constructor() {
    this.history = []
  }

  get paramsReq() {
    return {
      key: process.env.ACCESS_TOKEN,
      format: 'json',
      limit: 5,
    }
  }

  async buscar(lugar) {
    try {
      const instance = axios.create({
        baseURL: `https://us1.locationiq.com/v1/search?q=${lugar}`,
        params: this.paramsReq,
      })

      const { data } = await instance.get()

      return data.map((lugar) => ({
        id: lugar.place_id,
        nombre: lugar.display_name,
        lat: lugar.lat,
        lon: lugar.lon,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  get climaParams() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    }
  }

  async clima(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: { ...this.climaParams, lat, lon },
      })

      const { data } = await instance.get()

      const { main, weather } = data

      return {
        temp: main.temp,
        tmin: main.temp_min,
        tmax: main.temp_max,
        weather: weather[0].description,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async saveHistory(lugar) {
    if (!this.history.includes(lugar)) {
      this.history.unshift(lugar)
      this.history = this.history.splice(0, 5)
      writeDB(this.history)
    }
  }
}

module.exports = Busquedas
