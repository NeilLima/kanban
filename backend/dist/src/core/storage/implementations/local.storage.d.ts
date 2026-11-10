import { StorageService } from '../interfaces/storage.interface.js';
export declare class LocalStorageService implements StorageService {
    private readonly logger;
    private readonly basePath;
    constructor();
    saveBase64(inputData: string, filePath: string): Promise<string>;
    getFile(filePath: string): Promise<Buffer>;
    deleteFile(filePath: string): Promise<boolean>;
    fileExists(filePath: string): Promise<boolean>;
}
