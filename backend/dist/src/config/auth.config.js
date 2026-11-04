"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const config_1 = require("@nestjs/config");
const authConfig = () => ({
    jwtSecret: process.env.JWT_SECRET || 'madara202431',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
});
exports.authConfig = authConfig;
exports.default = (0, config_1.registerAs)('auth', exports.authConfig);
//# sourceMappingURL=auth.config.js.map