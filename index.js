import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userroute.js';
import productRoute from './routes/productroute.js';
import paymentRoute from './routes/paymentroute.js';

const app = express();
// app.use(cors());
dotenv.config();
app.use(express.json({ limit: '100mb' }));

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET, POST, PUT, DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
  credentials: true, 
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

//mongodb connection
const connectDb = async () => {
    try { const conn = await mongoose.connect(process.env.MONGO);
      console.log(`Connected to MongoDB database ${conn.connection.host}`);
    } catch (error) { console.log(error); }
  };
  connectDb();

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api', userRoute);
app.use('/product', productRoute);
app.use('/payment', paymentRoute);


//server is ruuning
app.listen(PORT, () => console.log("server is running on port : " + PORT));