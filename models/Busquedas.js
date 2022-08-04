require('dotenv').config()
const { default: axios } = require('axios')

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

      return data
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Busquedas
