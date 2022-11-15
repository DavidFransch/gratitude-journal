const { Pool } = require('pg');
const { v4: uuid } = require('uuid')

const credentials = {
  user: "postgres",
  host: "localhost", // or IP
  database: "postgres",
  password: "password",
  port: 5432
}

const pool = new Pool(credentials);

async function poolDemo() {
  const now = await pool.query("SELECT NOW()");
  return now;
}

async function getAllGratitudes() {
  const text = "SELECT * FROM gratitude";
  return pool.query(text);
}

async function getOneGratitude(gratitudeId) {
  const text = `SELECT * FROM gratitude WHERE id = $1`
  const values = [gratitudeId];
  return pool.query(text, values);
}

async function createNewGratitude(gratitudeToInsert) {
  const text = `INSERT INTO gratitude (id, name, description, mode, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [gratitudeToInsert.id, gratitudeToInsert.name, gratitudeToInsert.description, gratitudeToInsert.mode, gratitudeToInsert.createdAt, gratitudeToInsert.updatedAt];
  return pool.query(text, values);
}

async function updateGratitude(gratitudeId, changes) {
  const text  = `UPDATE gratitude SET name=$2, description=$3, updatedat=$4 WHERE id=$1`;
  const values = [gratitudeId, changes.name, changes.description, changes.updatedAt];
  return pool.query(text, values);
}

async function deleteGratitude(gratitudeId) {
  const text = `DELETE FROM gratitude WHERE id=$1`;
  const values = [gratitudeId];
  return pool.query(text, values);
}

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: "+ poolResult.rows[0]["now"]);

  console.log("******************GET ALL***********************");
  const getAllGratitudesResult = await getAllGratitudes();
  console.log(
    "Result of SELECT query for gratitudes :\n" + 
    JSON.stringify(getAllGratitudesResult.rows, null, " ") 
  )

  console.log("******************GET ONE***********************");
  const getOneGratitudeResult = await getOneGratitude("61dbae02-c147-4e28-863c-db7bd402b2d6");
  console.log(
    "Result of SELECT query for one gratitude :\n" +
    JSON.stringify(getOneGratitudeResult.rows[0], null, " ")
  ) 

 
  console.log("******************CREATE NEW***********************");
  // TODO: create gratitudeToInsert in services and parse as param
  const gratitudeToInsert = {
    id: uuid(),
    name: 'TEST NAME',
    description: 'TEST DESCRIPTION',
    mode: 'Free',
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  await createNewGratitude(gratitudeToInsert);
  const newGratitudeResult = await getOneGratitude(gratitudeToInsert.id);
  console.log(
    "Result of SELECT query for new gratitude :\n" +
    JSON.stringify(newGratitudeResult.rows[0], null, " ")
  ); 


  console.log("******************UPDATE***********************");
  const id ="61dbae02-c147-4e28-863c-db7bd402b2d6";
  const changes = {
    name: 'UPDATED TEST NAME',
    description: 'UPDATED TEST DESCRIPTION',
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  await updateGratitude(id, changes);
  console.log(`Updated gratitude with id: ${id}`);
  const updatedGratitudeResult = await getOneGratitude(id);
  console.log(
    "Result of SELECT query for updated gratitude :\n" +
    JSON.stringify(updatedGratitudeResult.rows[0], null, " ")
  );

  console.log("******************DELETE***********************");
  const idForDelete ="61dbae02-c147-4e28-863c-db7bd402b2d6";
  await deleteGratitude(idForDelete);
  console.log(`Updated gratitude with id: ${idForDelete}`);
  const deleteGratitudeResult = await getOneGratitude(id);
  console.log(
    "Result of SELECT query for deleted gratitude :\n" +
    JSON.stringify(deleteGratitudeResult.rows[0], null, " ")
  );

  await pool.end();
})();