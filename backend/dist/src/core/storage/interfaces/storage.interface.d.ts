export interface StorageService {
    saveBase64(base64Data: string, path: string): Promise<string>;
    getFile(path: string): Promise<Buffer>;
    deleteFile(path: string): Promise<boolean>;
    fileExists(path: string): Promise<boolean>;
}
