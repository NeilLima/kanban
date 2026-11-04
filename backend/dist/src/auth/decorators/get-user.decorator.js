"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('[GetUser Decorator] request.user:', request.user);
    if (!request.user) {
        console.warn('[GetUser Decorator] request.user está undefined');
        return null;
    }
    if (!request.user.userId) {
        console.warn('[GetUser Decorator] request.user.userId está undefined. User completo:', JSON.stringify(request.user));
        return request.user.id || request.user.sub || null;
    }
    return request.user.userId;
});
//# sourceMappingURL=get-user.decorator.js.map