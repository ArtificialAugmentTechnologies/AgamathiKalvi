import { createApp } from './app.js';
import { env } from './env.js';
import { prisma } from './lib/prisma.js';

const server = createApp().listen(env.PORT, () => {
  console.log(`Agamathi API listening on http://localhost:${env.PORT}/api`);
});

const shutdown = async () => {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
