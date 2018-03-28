'use strict'

const debug = require('debug')('platziverse:db:setup')
// inquirer es un modulo para pode tener interacciones en el promt
const inquirer = require('inquirer')
// chalk es para dar estilos al promt
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'Estas seguro de querer destruir la base de datos actual?'	
    }
  ])
  
  if (!answer.setup) {
  	return console.log('Nada que hacer')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Conexion establecida!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
