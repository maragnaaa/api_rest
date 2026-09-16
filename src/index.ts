import { env } from './config/env.ts';
import { app } from './app.ts';

app.listen(env.PORT, () => {
  console.log(`Server running in port ${env.PORT}`);
});
