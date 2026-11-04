"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
class ResponseBuilder {
    static success(data, message) {
        return {
            success: true,
            data,
            message
        };
    }
    static error(error) {
        return {
            success: false,
            error
        };
    }
    static paginated(data, total, page, limit) {
        return {
            success: true,
            data,
            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response.builder.js.map