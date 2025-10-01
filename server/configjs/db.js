// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try {
//         mongoose.connection.on('connected', ()=> console.log("Database connected")
//         )
//         await mongoose.connect(`${process.env.MONGODB_URI}/cultive`)
//     } catch (error){
//         console.log(error.massage);
//     }
// }

// export default connectDB;

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB || "cultive",
});

export default pool;
