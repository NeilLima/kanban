export function getBaseUrl() {
    return process.env.BACKEND_URL || '';
}
export function extractFileNameFromUrl(url) {
    const match = url.match(/\/file\/[^/]+\/(.+)$/);
    if (match && match[1]) {
        return decodeURIComponent(match[1]);
    }
    return null;
}
export function extractFileName(url) {
    if (!url)
        return null;
    const proxyMatch = url.match(/(?:\/storage\/file\/)(.+)$/);
    if (proxyMatch && proxyMatch[1]) {
        return decodeURIComponent(proxyMatch[1]);
    }
    const b2Match = url.match(/\/file\/[^/]+\/(.+)$/);
    if (b2Match && b2Match[1]) {
        return decodeURIComponent(b2Match[1]);
    }
    const uploadsMatch = url.match(/\/uploads\/(.+)$/);
    if (uploadsMatch && uploadsMatch[1]) {
        return decodeURIComponent(uploadsMatch[1]);
    }
    return null;
}
export function normalizeMediaUrl(url) {
    if (!url)
        return null;
    if (url.includes('/storage/file')) {
        if (url.startsWith('/storage/file')) {
            return `${getBaseUrl()}${url}`;
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `${getBaseUrl()}/${url}`;
    }
    if (url.startsWith('http') && url.includes('backblazeb2.com')) {
        const fileName = extractFileNameFromUrl(url);
        if (fileName) {
            return `${getBaseUrl()}/storage/file/${fileName}`;
        }
    }
    return url;
}
//# sourceMappingURL=url-normalizer.js.map