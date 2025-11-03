import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import shippingRoutes from './routes/shipping.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/shipping', shippingRoutes);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shipping';
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
