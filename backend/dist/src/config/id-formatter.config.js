"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdFormatter = void 0;
class IdFormatter {
    static format(id) {
        if (!id) {
            return '';
        }
        if (typeof id === 'string') {
            return id;
        }
        return id.toString();
    }
    static isValid(id) {
        return typeof id === 'string' && id.trim().length > 0;
    }
    static toId(id) {
        if (!this.isValid(id)) {
            throw new Error(`ID inválido: ${id}`);
        }
        return id;
    }
}
exports.IdFormatter = IdFormatter;
//# sourceMappingURL=id-formatter.config.js.map