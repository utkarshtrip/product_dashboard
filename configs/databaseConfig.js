import { Sequelize } from "sequelize";
import dotenv  from "dotenv";
dotenv.config()
const sequelize = new Sequelize(`postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // For self-signed certificates
          },
        },
    }
) 
export {sequelize}