const fs = require('fs')

const db = './db/data.json'

const writeDB = (data) => {
  if (data) {
    fs.writeFileSync(db, JSON.stringify(data))
  }
}

const readDB = () => {
  const data = fs.readFileSync(db, { encoding: 'utf-8' })
  return JSON.parse(data)
}

module.exports = { writeDB, readDB }
