const { Pool } = require('pg');

const credentials = {
  user: "postgres",
  host: "localhost",
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

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateGratitude,
  deleteGratitude
};