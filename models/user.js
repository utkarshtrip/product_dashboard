import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
export const User=sequelize.define(
    "user",
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        industry:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        organization:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        demo:{
            type:DataTypes.STRING,
            allowNull:true,
        }

    }
)
