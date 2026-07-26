import { registerAs } from '@nestjs/config';

export const corsConfig = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://frontend-liard-three-42.vercel.app',
    'https://frontend-pnjsgbhrt-nexusapis-projects.vercel.app',
    process.env.NEXT_PUBLIC_FRONTEND_URL,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default registerAs('cors', () => corsConfig);
