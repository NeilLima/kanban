export class ResponseBuilder {
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
//# sourceMappingURL=response.builder.js.map