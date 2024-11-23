import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2,
  }
);

// sequelize
//   .authenticate()
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.error("Connection error:", err));

(async ()=>{
  try{
    await sequelize.authenticate();
    console.log('Database connection established successfully!');
    await sequelize.sync(); 
  }catch(err){
    console.error('Unable to Connect to the database: ',err); 
  }
})();

export default sequelize;
