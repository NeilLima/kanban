"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('Database');
exports.default = (0, config_1.registerAs)('database', () => {
    const url = process.env.DATABASE_URL;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    logger.log(`🔌 Database URL configurada: ${url ? 'Sim' : 'Não'}`);
    logger.log(`🔌 Supabase URL configurada: ${supabaseUrl ? 'Sim' : 'Não'}`);
    return {
        url,
        supabaseUrl,
        supabaseServiceRoleKey,
    };
});
//# sourceMappingURL=database.config.js.map