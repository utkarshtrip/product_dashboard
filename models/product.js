import { DataTypes} from "sequelize";
import { sequelize } from "../configs/databaseConfig.js";
const Product=sequelize.define(
    "product",
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        detailsParagraphs:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        list:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        buttonText:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:"Learn More",
        },
        projectLink:{
            type:DataTypes.STRING,
            allowNull:true,
        }

    }
)
export default Product