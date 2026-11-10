import { StorageService } from '../interfaces/storage.interface.js';
export declare class GridFSStorageService implements StorageService {
    private readonly logger;
    constructor();
    saveBase64(base64Data: string, filePath: string): Promise<string>;
    getFileStream(fileId: string): Promise<unknown>;
    getFile(filePath: string): Promise<Buffer>;
    deleteFileById(fileId: string): Promise<boolean>;
    deleteFile(filePath: string): Promise<boolean>;
    fileExists(filePath: string): Promise<boolean>;
}
