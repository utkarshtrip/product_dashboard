import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const User=sequelize.define(
    "user",
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        roleId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        superAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        }

    }
)
export default User