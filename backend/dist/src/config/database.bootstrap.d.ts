export declare function resolveDatabaseConnection(): Promise<{
    database: string;
    host: string;
    isLocal: boolean;
    connectedTo: 'local' | 'production';
}>;
