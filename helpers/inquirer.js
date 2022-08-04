const inquirer = require('inquirer')
require('colors')

const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        {
          value: 1,
          name: `${'1.'.green} Buscar lugar`,
        },
        {
          value: 2,
          name: `${'2.'.green} Historial`,
        },
        {
          value: 0,
          name: `${'0.'.green} Salir`,
        },
      ],
    },
  ]

  console.clear()
  console.log('=========================='.green)
  console.log('  Seleccione una opción'.white)
  console.log('==========================\n'.green)

  const { opcion } = await inquirer.prompt(questions)

  return opcion
} // ya

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`,
    },
  ]

  console.log('\n')
  await inquirer.prompt(question)
} //ya

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'input',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      },
    },
  ]

  const { input } = await inquirer.prompt(question)
  return input
} //ya

const paisesSeleccion = async (lugares) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  })

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(question)

  return id
} //ya

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  paisesSeleccion,
}
