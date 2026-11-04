/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import * as fs from 'fs-extra';
import { Buffer } from 'buffer';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as os from 'os';

// ⚠️ CRÍTICO: sharp e ffmpeg são importados DINAMICAMENTE (lazy)
// para evitar crash no Vercel onde binários nativos não estão disponíveis
// Eles só são carregados quando as funções de processamento são chamadas

export const uploadsConfig = {
  maxFileSize: 1024 * 1024 * 1024 * 5, // Aumentado para 5GB
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

export const validateMedia = (
  base64String: string,
): {
  isValid: boolean;
  type: 'image' | 'video' | 'audio' | null;
  mimeType: string | null;
} => {
  try {
    const matches = base64String.match(
      /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/,
    );
    
    if (!matches) {
      const cleaned = typeof base64String === 'string'
        ? base64String.replace(/\s+/g, '')
        : '';

      const isProbablyBase64 =
        typeof base64String === 'string' &&
        cleaned.length > 100 &&
        /^[A-Za-z0-9+/=]+$/.test(cleaned);

      if (isProbablyBase64) {
        return { isValid: true, type: 'image', mimeType: 'image/jpeg' };
      }

      return { isValid: false, type: null, mimeType: null };
    }

    const mimeType = matches[1];

    if (uploadsConfig.allowedMimeTypes.image.includes(mimeType)) {
      return { isValid: true, type: 'image', mimeType };
    }
    if (uploadsConfig.allowedMimeTypes.video.includes(mimeType)) {
      return { isValid: true, type: 'video', mimeType };
    }
    if (uploadsConfig.allowedMimeTypes.audio.includes(mimeType)) {
      return { isValid: true, type: 'audio', mimeType };
    }

    return { isValid: false, type: null, mimeType };
  } catch (error) {
    console.error('❌ Erro na validação:', error);
    return { isValid: false, type: null, mimeType: null };
  }
};

export const processImage = async (base64String: string): Promise<string> => {
  try {
    // Importação dinâmica - só carrega sharp quando necessário
    const sharpModule = 'sharp';
    const sharp = (await import(sharpModule)).default;

    const svgMatch = base64String.match(/^data:image\/svg\+xml;base64,/);
    if (svgMatch) {
      return base64String;
    }

    const base64Data = base64String.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const processedBuffer = await sharp(buffer)
      .resize(
        uploadsConfig.compression.image.maxWidth,
        uploadsConfig.compression.image.maxHeight,
        {
          fit: 'inside',
          withoutEnlargement: true,
        },
      )
      .jpeg({ quality: uploadsConfig.compression.image.quality })
      .toBuffer();

    return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('❌ Erro no processamento da imagem:', error);
    if (error instanceof Error) console.error('Stack:', error.stack);
    return base64String;
  }
};

export const processVideo = async (base64String: string): Promise<string> => {
  try {
    // Importação dinâmica - só carrega ffmpeg quando necessário
    const ffmpegModule = 'fluent-ffmpeg';
    const installerModule = '@ffmpeg-installer/ffmpeg';
    const ffmpeg = (await import(ffmpegModule)).default;
    const ffmpegInstaller = (await import(installerModule)).default;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    const base64Data = base64String.replace(/^data:video\/[^;]+;base64,/, '');
    const inputBuffer = Buffer.from(base64Data, 'base64');

    const tmpDir = os.tmpdir();
    const inPath = join(tmpDir, `in-${Date.now()}.mp4`);
    const outPath = join(tmpDir, `out-${Date.now()}.mp4`);

    await fs.writeFile(inPath, inputBuffer);

    await new Promise<void>((resolve, reject) => {
      ffmpeg(inPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .size('?x720')
        .videoBitrate(uploadsConfig.compression.video.bitrate)
        .format(uploadsConfig.compression.video.format)
        .outputOptions('-movflags', 'faststart')
        .on('end', () => resolve())
        .on('error', reject)
        .save(outPath);
    });

    const outputBuffer = await fs.readFile(outPath);
    await fs.unlink(inPath);
    await fs.unlink(outPath);

    return `data:video/mp4;base64,${outputBuffer.toString('base64')}`;
  } catch (error) {
    console.error('❌ Erro no processamento do vídeo:', error);
    return base64String;
  }
};

export const processAudio = async (base64String: string): Promise<string> => {
  try {
    // Importação dinâmica - só carrega ffmpeg quando necessário
    const ffmpegModule = 'fluent-ffmpeg';
    const installerModule = '@ffmpeg-installer/ffmpeg';
    const ffmpeg = (await import(ffmpegModule)).default;
    const ffmpegInstaller = (await import(installerModule)).default;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    const base64Data = base64String.replace(/^data:audio\/\w+;base64,/, '');
    const inputBuffer = Buffer.from(base64Data, 'base64');
    const tempFilePath = join(process.cwd(), `temp-${Date.now()}.mp3`);

    await fs.writeFile(tempFilePath, inputBuffer);

    const outputBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const inputStream = createReadStream(tempFilePath);

      ffmpeg(inputStream)
        .audioBitrate(uploadsConfig.compression.audio.bitrate)
        .audioCodec(uploadsConfig.compression.audio.codec)
        .toFormat(uploadsConfig.compression.audio.format)
        .on('end', () => {
          fs.unlink(tempFilePath).catch(() => {});
          resolve(Buffer.concat(chunks));
        })
        .on('error', (err: any) => {
          console.error('❌ Erro no ffmpeg:', err);
          fs.unlink(tempFilePath).catch(() => {});
          reject(err instanceof Error ? err : new Error(String(err)));
        })
        .pipe()
        .on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    });

    return `data:audio/mp3;base64,${outputBuffer.toString('base64')}`;
  } catch (error) {
    console.error('❌ Erro no processamento do áudio:', error);
    throw new Error('Erro ao processar áudio');
  }
};

export const processMedia = async (base64String: string): Promise<string> => {
  const validation = validateMedia(base64String);

  if (!validation.isValid) {
    console.error('❌ Formato de mídia inválido');
    throw new Error('Formato de mídia inválido');
  }

  try {
    let result;
    switch (validation.type) {
      case 'image':
        result = await processImage(base64String);
        break;
      case 'video':
        result = await processVideo(base64String);
        break;
      case 'audio':
        result = await processAudio(base64String);
        break;
      default:
        throw new Error('Tipo de mídia não suportado');
    }
    return result;
  } catch (error) {
    console.error('❌ Erro durante o processamento:', error);
    throw error;
  }
};

export default registerAs('uploads', () => uploadsConfig);