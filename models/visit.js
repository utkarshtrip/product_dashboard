import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
import Visitor from "./visitor.js";
const Visit=sequelize.define(
    "visit",
    {
        visitDates:{
            type:DataTypes.ARRAY(DataTypes.DATE),
            allowNull:false
        },
        productId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        visitorId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        revisits:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        }
    }
)
export default Visit