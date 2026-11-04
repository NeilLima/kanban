"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessUpload = void 0;
const common_1 = require("@nestjs/common");
const uploads_config_1 = require("../../../config/uploads.config");
exports.ProcessUpload = (0, common_1.createParamDecorator)(async (options = {}, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { field = 'file', required = false } = options;
    const base64Data = field.includes('.')
        ? field.split('.').reduce((obj, prop) => obj && obj[prop], request.body)
        : request.body[field];
    if (!base64Data) {
        if (required) {
            throw new common_1.BadRequestException(`Campo '${field}' obrigatório`);
        }
        return null;
    }
    const validation = (0, uploads_config_1.validateMedia)(base64Data);
    if (!validation.isValid) {
        throw new common_1.BadRequestException(`Formato de mídia inválido: ${validation.mimeType || 'desconhecido'}`);
    }
    try {
        const processedData = await (0, uploads_config_1.processMedia)(base64Data);
        return {
            data: processedData,
            type: validation.type,
            mimeType: validation.mimeType
        };
    }
    catch (error) {
        throw new common_1.BadRequestException(`Erro ao processar upload: ${error.message}`);
    }
});
//# sourceMappingURL=upload.decorator.js.map