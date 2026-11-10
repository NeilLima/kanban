import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { processMedia, validateMedia } from '../../../config/uploads.config.js';
export const ProcessUpload = createParamDecorator(async (options = {}, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { field = 'file', required = false } = options;
    const base64Data = field.includes('.')
        ? field.split('.').reduce((obj, prop) => obj && obj[prop], request.body)
        : request.body[field];
    if (!base64Data) {
        if (required) {
            throw new BadRequestException(`Campo '${field}' obrigatório`);
        }
        return null;
    }
    const validation = validateMedia(base64Data);
    if (!validation.isValid) {
        throw new BadRequestException(`Formato de mídia inválido: ${validation.mimeType || 'desconhecido'}`);
    }
    try {
        const processedData = await processMedia(base64Data);
        return {
            data: processedData,
            type: validation.type,
            mimeType: validation.mimeType
        };
    }
    catch (error) {
        throw new BadRequestException(`Erro ao processar upload: ${error.message}`);
    }
});
//# sourceMappingURL=upload.decorator.js.map