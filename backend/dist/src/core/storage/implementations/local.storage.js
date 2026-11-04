"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const uploads_config_1 = require("../../../config/uploads.config");
let LocalStorageService = class LocalStorageService {
    logger = new common_1.Logger('LocalStorageService');
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
            const validation = (0, uploads_config_1.validateMedia)(base64Data);
            if (!validation.isValid) {
                this.logger.warn(`Formato de mídia inválido ou não suportado: ${validation.mimeType || 'desconhecido'}`);
                return `https://storage.example.com/${filePath}`;
            }
            const processedData = await (0, uploads_config_1.processMedia)(base64Data);
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
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
//# sourceMappingURL=local.storage.js.map