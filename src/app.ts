import express from 'express';
import { usersRoutes } from './features/users/users.routes.ts';
import { errorHandler } from './shared/middlewares/errorHandler.ts';
import { notFound } from './shared/middlewares/notFound.ts';
import type { Response } from 'express';

const app = express();

app.use(express.json());

app.get('/health', (res: Response) => {
  res.json({ status: 'ok', message: 'API running...' });
});

app.use(usersRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
