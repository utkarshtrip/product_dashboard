import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const Feedback=sequelize.define(
    "feedback",
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    }
)
export default Feedback