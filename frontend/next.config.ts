import type { NextConfig } from "next";
import os from "os";

/**
 * 📱 IPs IPv4 LAN da máquina (ex.: 192.168.1.4) — o Next 16 bloqueia com 403
 * os assets de dev para origens fora desta lista (celular via Wi-Fi).
 *
 * 🔎 Detectado em TEMPO DE EXECUÇÃO (não quebra quando o IP do Wi-Fi muda) +
 *    aceita IPs EXTRA/FIXOS via `frontend/.env.local`:
 *      NEXT_PUBLIC_LAN_IP="192.168.1.4"            (um IP)
 *      NEXT_PUBLIC_LAN_IP="192.168.1.4,10.0.0.5"  (vários, por vírgula)
 */
const detectedLanIps = Object.values(os.networkInterfaces())
  .flat()
  .filter((net): net is NonNullable<typeof net> => Boolean(net))
  .filter((net) => net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

const envLanIps = (process.env.NEXT_PUBLIC_LAN_IP ?? "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

/** 🔗 Detectados + fixos, sem repetição (ex.: ["192.168.1.4"]) */
const lanIps = Array.from(new Set([...detectedLanIps, ...envLanIps]));

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: __dirname,
  },
  /**
   * 🔀 PROXY /api → BACKEND (padrão Lumen).
   * - O backend usa prefixo global `/api` (setGlobalPrefix), por isso o
   *   destino acrescenta `/api/:path*`.
   * - Dev: NEXT_PUBLIC_API_URL (default http://localhost:3002) — SEM /api.
   * - Produção: NEXT_PUBLIC_API_URL_PRODUCTION (URL do backend).
   * - No celular NÃO se usa env: o baseURL do axios vira `${host}/api`
   *   (próprio Next vira proxy) — funciona em PC e Wi-Fi sem IP fixo.
   */
  async rewrites() {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION || "https://kanban-backend-ashy.vercel.app"
        : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
    const base = apiUrl.replace(/\/api$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${base}/api/:path*`,
      },
    ];
  },
  /**
   * Permite acessar o dev server pela rede local (ex.: celular em
   * http://192.168.1.4:3000). Sem isso o Next 16 bloqueia os assets
   * de dev (chunks de JS) com 403 para origens fora do localhost.
   */
  allowedDevOrigins: lanIps,
};

export default nextConfig;

