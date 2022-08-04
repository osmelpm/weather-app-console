const {
  leerInput,
  inquirerMenu,
  pausa,
  paisesSeleccion,
} = require('./helpers/inquirer')
const Busquedas = require('./models/Busquedas')

const main = async () => {
  let opt
  const busquedas = new Busquedas()

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const lugar = await leerInput('Lugar: ')
        //Buscar los lugares
        const lugares = await busquedas.buscar(lugar)
        //Seleccionar lugar
        const seleccion = await paisesSeleccion(lugares)

        const { nombre, lat, lon } = lugares.find(
          (lugar) => (lugar.id = seleccion),
        )
        //Clima
        const { temp, tmin, tmax, weather } = await busquedas.clima(lat, lon)

        //Mostrar resultados

        console.clear()
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Lugar:', nombre.green)
        console.log('Lat:', lat.yellow)
        console.log('Lng:', lon.yellow)
        console.log('Temperatura:', temp)
        console.log('Mínima:', tmin)
        console.log('Máxima:', tmax)
        console.log('Cómo está el clima:', weather.green)
        break

      case 2:
        console.log('mostar historia')
        break
    }

    if (opt !== 0) await pausa()
  } while (opt !== 0)
}

main()
