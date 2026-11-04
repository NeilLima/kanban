"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridFSStorageService = void 0;
const common_1 = require("@nestjs/common");
let GridFSStorageService = class GridFSStorageService {
    logger = new common_1.Logger('GridFSStorageService');
    constructor() { }
    async saveBase64(base64Data, filePath) {
        try {
            if (!base64Data || !filePath) {
                throw new Error('Parâmetros inválidos');
            }
            return `https://storage.example.com/${filePath}`;
        }
        catch (error) {
            this.logger.error(`Erro ao processar base64: ${error.message}`);
            return `https://storage.example.com/${filePath}`;
        }
    }
    async getFileStream(fileId) {
        this.logger.warn(`Tentativa de obter stream (GridFS) desativado: ${fileId}`);
        throw new Error('GridFS desativado. Use StorageService (LocalStorageService).');
    }
    async getFile(filePath) {
        this.logger.warn(`Tentativa de acessar getFile() com caminho - não implementado: ${filePath}`);
        throw new Error('Método getFile não implementado diretamente no GridFS. Use getFileStream com ID.');
    }
    async deleteFileById(fileId) {
        this.logger.warn(`Tentativa de excluir por ID (GridFS) desativado: ${fileId}`);
        return false;
    }
    async deleteFile(filePath) {
        this.logger.warn(`Tentativa de excluir arquivo pelo caminho - não implementado diretamente: ${filePath}`);
        return true;
    }
    async fileExists(filePath) {
        this.logger.warn(`Tentativa de verificar se arquivo existe pelo caminho - não implementado: ${filePath}`);
        return false;
    }
};
exports.GridFSStorageService = GridFSStorageService;
exports.GridFSStorageService = GridFSStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GridFSStorageService);
//# sourceMappingURL=gridfs.storage.js.map