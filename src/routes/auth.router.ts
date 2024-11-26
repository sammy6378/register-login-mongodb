
import { register,Login } from '../Auth/auth';

import { Hono } from "hono";

export const authRouter = new Hono();

// register routes
authRouter.post('/register', register);
authRouter.post('/login', Login);
