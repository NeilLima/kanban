var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { processMedia, validateMedia } from '../../../config/uploads.config';
let LocalStorageService = class LocalStorageService {
    logger = new Logger('LocalStorageService');
    basePath;
    constructor() {
        this.basePath = path.join(process.cwd(), 'temp');
    }
    async saveBase64(inputData, filePath) {
        try {
            const isBase64WithHeader = typeof inputData === 'string' && inputData.startsWith('data:');
            let base64Data = inputData;
            if (!isBase64WithHeader) {
                const ext = path.extname(filePath).toLowerCase();
                let mimeType = 'application/octet-stream';
                if (['.jpg', '.jpeg'].includes(ext))
                    mimeType = 'image/jpeg';
                else if (ext === '.png')
                    mimeType = 'image/png';
                else if (['.mp4', '.mpeg4'].includes(ext))
                    mimeType = 'video/mp4';
                else if (ext === '.webm')
                    mimeType = 'video/webm';
                else if (['.avi', '.x-msvideo'].includes(ext))
                    mimeType = 'video/x-msvideo';
                else if (ext === '.mkv')
                    mimeType = 'video/x-matroska';
                base64Data = `data:${mimeType};base64,${inputData}`;
            }
            const validation = validateMedia(base64Data);
            if (!validation.isValid) {
                this.logger.warn(`Formato de mídia inválido ou não suportado: ${validation.mimeType || 'desconhecido'}`);
                return `https://storage.example.com/${filePath}`;
            }
            const processedData = await processMedia(base64Data);
            return processedData;
        }
        catch (error) {
            this.logger.error(`Erro ao processar dados: ${error.message}`);
            return `https://storage.example.com/${filePath}`;
        }
    }
    async getFile(filePath) {
        this.logger.warn(`Tentativa de acessar getFile() em armazenamento base64 - não suportado`);
        throw new Error('Método getFile não é aplicável ao armazenamento base64');
    }
    async deleteFile(filePath) {
        this.logger.warn(`Tentativa de acessar deleteFile() em armazenamento base64 - não suportado`);
        return true;
    }
    async fileExists(filePath) {
        this.logger.warn(`Tentativa de acessar fileExists() em armazenamento base64 - não suportado`);
        return false;
    }
};
LocalStorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=local.storage.js.map