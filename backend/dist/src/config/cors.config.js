"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const config_1 = require("@nestjs/config");
const isDev = process.env.NODE_ENV !== 'production';
exports.corsConfig = {
    origin: isDev
        ? true
        : [
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
exports.default = (0, config_1.registerAs)('cors', () => exports.corsConfig);
//# sourceMappingURL=cors.config.js.map