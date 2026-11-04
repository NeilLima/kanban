"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = Crud;
const common_1 = require("@nestjs/common");
function Crud(options) {
    const { model, dto, routes, entity } = options;
    const entityName = (entity?.name || model.name);
    const includeRoutes = {
        create: true,
        findAll: true,
        findOne: true,
        update: true,
        remove: true
    };
    if (routes?.exclude) {
        routes.exclude.forEach(route => {
            includeRoutes[route] = false;
        });
    }
    if (routes?.only) {
        const onlyRoutes = routes.only;
        Object.keys(includeRoutes).forEach((route) => {
            includeRoutes[route] = onlyRoutes.includes(route);
        });
    }
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor));
}
//# sourceMappingURL=crud.decorator.js.map