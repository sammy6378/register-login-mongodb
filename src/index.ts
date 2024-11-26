
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from 'hono/cors'
import 'dotenv/config'
import connectDB from './db/connect';
import { authRouter } from "./routes/auth.router";

const app = new Hono();

app.use('*', cors())


const url = process.env.DATABASE_URL;


connectDB(url as string);

// routes
app.route('/auth', authRouter);

app.get('/',(c) =>{
    return c.text('Server is working...')
})

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
  })