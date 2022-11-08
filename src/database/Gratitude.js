const { Client } = require('pg')

const getAllGratitudes = async () => {
  const client = new Client({
    user: "postgres",
    password: "password",
    host: "192.168.204.71",
    port: "5432",
    database: "gratitudedb"
  });
  try {
    await client.connect();
    console.log('Successfully connected');
    const { rows } = await client.query('select * from gratitudes');
    console.table(rows);
    return rows;
  } catch(e) {
    console.log(`Something went wrong ${e}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
};

module.exports = { getAllGratitudes };