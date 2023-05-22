const { SEEDERS } = require('./seeders/index')

module.exports.runSeeding = async () => {
 for(let SEEDER of SEEDERS){
   await SEEDER();
 }
}