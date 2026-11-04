"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.firebaseConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID || 'nexusapi-dcc2e',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'nexusapi-dcc2e.appspot.com',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};
exports.default = (0, config_1.registerAs)('firebase', () => exports.firebaseConfig);
//# sourceMappingURL=firebase.config.js.map