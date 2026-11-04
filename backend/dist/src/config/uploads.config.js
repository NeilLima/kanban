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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMedia = exports.processAudio = exports.processVideo = exports.processImage = exports.validateMedia = exports.uploadsConfig = void 0;
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs-extra"));
const buffer_1 = require("buffer");
const fs_1 = require("fs");
const path_1 = require("path");
const os = __importStar(require("os"));
exports.uploadsConfig = {
    maxFileSize: 1024 * 1024 * 1024 * 5,
    allowedMimeTypes: {
        image: [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/x-png',
            'image/gif',
            'image/webp',
            'image/avif',
            'image/bmp',
            'image/tiff',
            'image/svg+xml',
            'image/heic',
            'image/heif',
        ],
        video: [
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            'video/webm',
            'video/x-matroska',
            'video/3gpp',
            'video/3gpp2',
            'video/x-ms-wmv',
            'video/x-flv',
            'video/x-ms-asf',
            'video/ogg',
            'video/ogv',
            'video/mp2t',
        ],
        audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
    },
    compression: {
        image: {
            quality: 80,
            maxWidth: 1920,
            maxHeight: 1080,
            format: 'jpeg',
        },
        video: {
            codec: 'libx264',
            bitrate: '1000k',
            maxWidth: 1280,
            maxHeight: 720,
            format: 'mp4',
        },
        audio: {
            codec: 'libmp3lame',
            bitrate: '128k',
            format: 'mp3',
        },
    },
};
const validateMedia = (base64String) => {
    try {
        const matches = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
        if (!matches) {
            const cleaned = typeof base64String === 'string'
                ? base64String.replace(/\s+/g, '')
                : '';
            const isProbablyBase64 = typeof base64String === 'string' &&
                cleaned.length > 100 &&
                /^[A-Za-z0-9+/=]+$/.test(cleaned);
            if (isProbablyBase64) {
                return { isValid: true, type: 'image', mimeType: 'image/jpeg' };
            }
            return { isValid: false, type: null, mimeType: null };
        }
        const mimeType = matches[1];
        if (exports.uploadsConfig.allowedMimeTypes.image.includes(mimeType)) {
            return { isValid: true, type: 'image', mimeType };
        }
        if (exports.uploadsConfig.allowedMimeTypes.video.includes(mimeType)) {
            return { isValid: true, type: 'video', mimeType };
        }
        if (exports.uploadsConfig.allowedMimeTypes.audio.includes(mimeType)) {
            return { isValid: true, type: 'audio', mimeType };
        }
        return { isValid: false, type: null, mimeType };
    }
    catch (error) {
        console.error('❌ Erro na validação:', error);
        return { isValid: false, type: null, mimeType: null };
    }
};
exports.validateMedia = validateMedia;
const processImage = async (base64String) => {
    try {
        const sharpModule = 'sharp';
        const sharp = (await import(sharpModule)).default;
        const svgMatch = base64String.match(/^data:image\/svg\+xml;base64,/);
        if (svgMatch) {
            return base64String;
        }
        const base64Data = base64String.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
        const buffer = buffer_1.Buffer.from(base64Data, 'base64');
        const processedBuffer = await sharp(buffer)
            .resize(exports.uploadsConfig.compression.image.maxWidth, exports.uploadsConfig.compression.image.maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
        })
            .jpeg({ quality: exports.uploadsConfig.compression.image.quality })
            .toBuffer();
        return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
    }
    catch (error) {
        console.error('❌ Erro no processamento da imagem:', error);
        if (error instanceof Error)
            console.error('Stack:', error.stack);
        return base64String;
    }
};
exports.processImage = processImage;
const processVideo = async (base64String) => {
    try {
        const ffmpegModule = 'fluent-ffmpeg';
        const installerModule = '@ffmpeg-installer/ffmpeg';
        const ffmpeg = (await import(ffmpegModule)).default;
        const ffmpegInstaller = (await import(installerModule)).default;
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
        const base64Data = base64String.replace(/^data:video\/[^;]+;base64,/, '');
        const inputBuffer = buffer_1.Buffer.from(base64Data, 'base64');
        const tmpDir = os.tmpdir();
        const inPath = (0, path_1.join)(tmpDir, `in-${Date.now()}.mp4`);
        const outPath = (0, path_1.join)(tmpDir, `out-${Date.now()}.mp4`);
        await fs.writeFile(inPath, inputBuffer);
        await new Promise((resolve, reject) => {
            ffmpeg(inPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .size('?x720')
                .videoBitrate(exports.uploadsConfig.compression.video.bitrate)
                .format(exports.uploadsConfig.compression.video.format)
                .outputOptions('-movflags', 'faststart')
                .on('end', () => resolve())
                .on('error', reject)
                .save(outPath);
        });
        const outputBuffer = await fs.readFile(outPath);
        await fs.unlink(inPath);
        await fs.unlink(outPath);
        return `data:video/mp4;base64,${outputBuffer.toString('base64')}`;
    }
    catch (error) {
        console.error('❌ Erro no processamento do vídeo:', error);
        return base64String;
    }
};
exports.processVideo = processVideo;
const processAudio = async (base64String) => {
    try {
        const ffmpegModule = 'fluent-ffmpeg';
        const installerModule = '@ffmpeg-installer/ffmpeg';
        const ffmpeg = (await import(ffmpegModule)).default;
        const ffmpegInstaller = (await import(installerModule)).default;
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
        const base64Data = base64String.replace(/^data:audio\/\w+;base64,/, '');
        const inputBuffer = buffer_1.Buffer.from(base64Data, 'base64');
        const tempFilePath = (0, path_1.join)(process.cwd(), `temp-${Date.now()}.mp3`);
        await fs.writeFile(tempFilePath, inputBuffer);
        const outputBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            const inputStream = (0, fs_1.createReadStream)(tempFilePath);
            ffmpeg(inputStream)
                .audioBitrate(exports.uploadsConfig.compression.audio.bitrate)
                .audioCodec(exports.uploadsConfig.compression.audio.codec)
                .toFormat(exports.uploadsConfig.compression.audio.format)
                .on('end', () => {
                fs.unlink(tempFilePath).catch(() => { });
                resolve(buffer_1.Buffer.concat(chunks));
            })
                .on('error', (err) => {
                console.error('❌ Erro no ffmpeg:', err);
                fs.unlink(tempFilePath).catch(() => { });
                reject(err instanceof Error ? err : new Error(String(err)));
            })
                .pipe()
                .on('data', (chunk) => chunks.push(buffer_1.Buffer.from(chunk)));
        });
        return `data:audio/mp3;base64,${outputBuffer.toString('base64')}`;
    }
    catch (error) {
        console.error('❌ Erro no processamento do áudio:', error);
        throw new Error('Erro ao processar áudio');
    }
};
exports.processAudio = processAudio;
const processMedia = async (base64String) => {
    const validation = (0, exports.validateMedia)(base64String);
    if (!validation.isValid) {
        console.error('❌ Formato de mídia inválido');
        throw new Error('Formato de mídia inválido');
    }
    try {
        let result;
        switch (validation.type) {
            case 'image':
                result = await (0, exports.processImage)(base64String);
                break;
            case 'video':
                result = await (0, exports.processVideo)(base64String);
                break;
            case 'audio':
                result = await (0, exports.processAudio)(base64String);
                break;
            default:
                throw new Error('Tipo de mídia não suportado');
        }
        return result;
    }
    catch (error) {
        console.error('❌ Erro durante o processamento:', error);
        throw error;
    }
};
exports.processMedia = processMedia;
exports.default = (0, config_1.registerAs)('uploads', () => exports.uploadsConfig);
//# sourceMappingURL=uploads.config.js.map