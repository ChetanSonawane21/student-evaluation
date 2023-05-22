module.exports = {
  port: 3306,
  assest_url: '',
  db_name: 'evaluation_system_database',
  host: 'localhost',
  user: 'root',
  password: 'root',
  dialect: 'mysql',
  timezone: '+00:00',
  logging: false,
  pool: {
    max: 100,
    min: 0,
    acquire: 500,
    idle: 100
  }
};
