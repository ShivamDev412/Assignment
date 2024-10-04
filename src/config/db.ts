import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shivam412",
  database: "userDB",
});

export default pool;