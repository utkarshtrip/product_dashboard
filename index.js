import express from 'express'
import dotenv from 'dotenv'
import contactRoute from './routes/contactRoute.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { sequelize } from './configs/databaseConfig.js'
import path from 'path'

dotenv.config()
// Setting up server
const PORT= process.env.PORT || 5000
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
    methods:"*",
    credentials:true
}))
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const __filename = new URL(import.meta.url).href;
const __dirname = path.dirname(__filename);
console.log( path.join(__dirname,'dist','index.html'))

// Serve static files from the 'dist' folder
app.use(express.static( 'dist', { root: '.' }));

// Serve index.html for all routes (this is optional for single-page apps)
app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' })
});

app.use('/contact',contactRoute)

sequelize.authenticate().then(()=>console.log('Connected to database')).catch((err)=>{console.log(err)})
sequelize.sync()