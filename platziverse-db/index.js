'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequielize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)
  // creamos las funciones de relaciones de la base de datos
  // esto nos va crear los id y las llaves foraneas
  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)
  // funcion para ver si hay enlace con la base de datos
  await sequielize.authenticate()

  if (config.setup) {
    await sequielize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}
  return {
    Agent,
    Metric
  }
}
