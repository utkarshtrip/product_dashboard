import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const Role=sequelize.define(
    "role",
    {
        rolename:{
            type:DataTypes.STRING,
            allowNull:false,
        }

    }
)
export default Role