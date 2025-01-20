import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const Contact=sequelize.define(
    "contact",
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
            unique:true
        },
        industry:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        organization:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        visits:{
            type:DataTypes.INTEGER,
            defaultValue:1,
            allowNull:false,
        },
        lastVisit:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:Date.now()
        }

    }
)
export default Contact