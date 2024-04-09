const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

let db = null
const app = express()
const dbPath = path.join(__dirname, 'cricketTeam.db')

const initializationDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    console.log(db)
    app.listen(3000, () => {
      console.log('server running')
    })
  } catch (e) {
    process.exit(1)
  }
}
initializationDBAndServer()

app.get('/players/', async (request, response) => {
  const getPlayerQuery = `
    SELECT 
    * 
    FROM 
    cricket_team 
    ORDER BY 
    player_id;`
  const playerArray = await db.all(getPlayerQuery)
  response.send(playerArray)
})
