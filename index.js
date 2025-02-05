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
import Visit from './models/visit.js'
import Contact from './models/contact.js'
import Product from './models/product.js'
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
    origin: "https://store.flairminds.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials:true,
  }))
app.listen(PORT,()=>{
    console.log(`Server is running fine.`)
})

const __filename = new URL(import.meta.url).href;
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    next();
});
app.use('/visitors',contactRoute)
app.use('/auth',authRoute)
app.use('/admin',adminActionsRoute)
// Serve static files from the 'dist' folder
app.use(express.static( 'dist', { root: '.' }));

// Serve index.html for all routes (this is optional for single-page apps)
app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' })
});

User.belongsTo(Role,{foreignKey:'roleId',as:'role',onDelete:'CASCADE'})
Visit.belongsTo(Product,{foreignKey:'productId',as:"product"})
Visit.belongsTo(Visitor,{foreignKey:'visitorId',as:"visitor"})
sequelize.authenticate().then(()=>console.log('Connected to database')).catch((err)=>{console.log(err)})
sequelize.sync().then(()=>{console.log("database is synchronized")}).catch((err)=>{console.log({err})})