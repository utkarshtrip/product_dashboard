import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const Visitor=sequelize.define(
    "visitor",
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
            allowNull: true,
        },
        organization:{
            type: DataTypes.STRING,
            allowNull: true,
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
        },
         interests:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull:false,
            defaultValue:[],
         }

    }
)
export default Visitor