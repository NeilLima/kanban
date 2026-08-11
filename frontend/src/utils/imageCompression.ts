'use client';
import { useState, useCallback } from 'react';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 0.8;

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useImageCompression() {
  const [compressing, setCompressing] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
// ============================================
  // (nenhum objeto adicional)

  // ============================================
  // 4️⃣ FUNÇÕES
// ============================================
  const compressImage = useCallback(async (file: File): Promise<File> => {
    setCompressing(true);
    try {
      const bitmap = await createImageBitmap(file);
      let width = bitmap.width;
      let height = bitmap.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;

      ctx.drawImage(bitmap, 0, 0, width, height);
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: QUALITY });
      return new File([blob], file.name, { type: 'image/jpeg' });
    } finally {
      setCompressing(false);
    }
  }, []);

  return { compressImage, compressing };
}

export async function compressImage(file: File, options?: { maxSizeMB?: number; maxWidthOrHeight?: number }): Promise<File> {
  const maxWidth = options?.maxWidthOrHeight || 1920;
  const maxHeight = options?.maxWidthOrHeight || 1080;
  const quality = options?.maxSizeMB ? Math.min(0.9, 1 - (options.maxSizeMB / 10)) : 0.8;

  const bitmap = await createImageBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.floor(width * ratio);
    height = Math.floor(height * ratio);
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  return new File([blob], file.name, { type: 'image/jpeg' });
}
