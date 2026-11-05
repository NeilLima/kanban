import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
export function Crud(options) {
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
    return applyDecorators(UseInterceptors(ClassSerializerInterceptor));
}
//# sourceMappingURL=crud.decorator.js.map