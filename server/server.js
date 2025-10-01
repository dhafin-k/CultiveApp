import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

//  Middleware 
app.use(cors())
app.use(express.json())

// Route
app.get('/', (req, res)=> res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is Running on port ' + PORT)
})

export default app;