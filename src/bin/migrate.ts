import { db } from "../db/database";
import { createConnection } from "mariadb";


export const connectDB = async() => {
  await checkDB();
  await db.sync({ "force": true }).then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Err", err);
  });
};

const checkDB = async() => {
  await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }).then(async(conn) => {
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_SCHEMA};`)
      .then(() => {
        console.log("Database checked");
      }).catch((err) => {
        console.log("Err", err);
      });
  }).catch((err) => { console.log("Err", err); });
};