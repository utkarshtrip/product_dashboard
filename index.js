import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sequelize } from './configs/databaseConfig.js'
// import { sequelize } from './models/index.js'
import Role from './models/role.js'
import User from './models/user.js'
import Visitor from './models/visitor.js'
import path from 'path'
// importing Routes
import contactRoute from './routes/contactRoute.js'
import authRoute from './routes/authenticationRoutes.js'
import adminActionsRoute from './routes/adminActionsRoute.js'

dotenv.config()
// Setting up server
const PORT= process.env.PORT || 5000
const app=express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const __filename = new URL(import.meta.url).href;
const __dirname = path.dirname(__filename);
console.log( path.join(__dirname,'dist','index.html'))

// Serve static files from the 'dist' folder
// app.use(express.static( 'dist', { root: '.' }));

// // Serve index.html for all routes (this is optional for single-page apps)
// app.get('*', (req, res) => {
//     res.sendFile('dist/index.html', { root: '.' })
// });

app.use('/visitors',contactRoute)
app.use('/auth',authRoute)
app.use('/admin',adminActionsRoute)

User.belongsTo(Role,{foreignKey:'roleId',as:'role',onDelete:'CASCADE'})
sequelize.authenticate().then(()=>console.log('Connected to database')).catch((err)=>{console.log(err)})
sequelize.sync().then(()=>{console.log("database is synchronized")}).catch((err)=>{console.log({err})})