export declare const uploadsConfig: {
    maxFileSize: number;
    allowedMimeTypes: {
        image: string[];
        video: string[];
        audio: string[];
    };
    compression: {
        image: {
            quality: number;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        video: {
            codec: string;
            bitrate: string;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        audio: {
            codec: string;
            bitrate: string;
            format: string;
        };
    };
};
export declare const validateMedia: (base64String: string) => {
    isValid: boolean;
    type: "image" | "video" | "audio" | null;
    mimeType: string | null;
};
export declare const processImage: (base64String: string) => Promise<string>;
export declare const processVideo: (base64String: string) => Promise<string>;
export declare const processAudio: (base64String: string) => Promise<string>;
export declare const processMedia: (base64String: string) => Promise<string>;
declare const _default: (() => {
    maxFileSize: number;
    allowedMimeTypes: {
        image: string[];
        video: string[];
        audio: string[];
    };
    compression: {
        image: {
            quality: number;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        video: {
            codec: string;
            bitrate: string;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        audio: {
            codec: string;
            bitrate: string;
            format: string;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    maxFileSize: number;
    allowedMimeTypes: {
        image: string[];
        video: string[];
        audio: string[];
    };
    compression: {
        image: {
            quality: number;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        video: {
            codec: string;
            bitrate: string;
            maxWidth: number;
            maxHeight: number;
            format: string;
        };
        audio: {
            codec: string;
            bitrate: string;
            format: string;
        };
    };
}>;
export default _default;
