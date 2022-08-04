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
        const lugar = await leerInput('Lugar: ')
        console.clear()

        const lugares = await busquedas.buscar(lugar)

        const seleccion = await paisesSeleccion(lugares)

        const { display_name, lat, lon } = lugares.find(
          (lugar) => (lugar.place_id = seleccion),
        )

        //Clima

        //Mostrar resultados

        console.log('\nInformación de la ciudad\n'.green)
        console.log(`Lugar: ${`${display_name}`.green}`)
        console.log(`Lat: ${`${lat}`.yellow}`)
        console.log(`Lng: ${`${lon}`.yellow}`)
        // console.log('Temperatura: ')
        // console.log('Mínima: ')
        // console.log('Máxima: ')
        // console.log('Cómo está el clima: ')
        break

      case 2:
        console.log('mostar historia')
        break
    }

    if (opt !== 0) await pausa()
  } while (opt !== 0)
}

main()
