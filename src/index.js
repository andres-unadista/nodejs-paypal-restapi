import express from "express";
import morgan from "morgan";
import path from 'path'

import { PORT } from "./config";
import paymentRoutes from './routes/payment.routes'


const app = express()
app.listen(PORT)

app.use(morgan('dev'));

app.use(paymentRoutes)

app.use(express.static(path.join(__dirname, 'public')))
console.log('Listening on port:', PORT);