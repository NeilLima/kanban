"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    static buildFilter(params) {
        const filter = {};
        const { page, limit, sort, ...queryParams } = params;
        Object.keys(queryParams).forEach(key => {
            const value = queryParams[key];
            if (value === undefined || value === null || value === '') {
                return;
            }
            if (key.includes('__')) {
                const [field, operator] = key.split('__');
                switch (operator) {
                    case 'eq':
                        filter[field] = value;
                        break;
                    case 'ne':
                        filter[field] = { $ne: value };
                        break;
                    case 'gt':
                        filter[field] = { ...filter[field], $gt: value };
                        break;
                    case 'gte':
                        filter[field] = { ...filter[field], $gte: value };
                        break;
                    case 'lt':
                        filter[field] = { ...filter[field], $lt: value };
                        break;
                    case 'lte':
                        filter[field] = { ...filter[field], $lte: value };
                        break;
                    case 'contains':
                        filter[field] = { $regex: value, $options: 'i' };
                        break;
                    case 'in':
                        const inValues = Array.isArray(value) ? value : value.split(',');
                        filter[field] = { $in: inValues };
                        break;
                    case 'nin':
                        const ninValues = Array.isArray(value) ? value : value.split(',');
                        filter[field] = { $nin: ninValues };
                        break;
                    case 'exists':
                        filter[field] = { $exists: value === 'true' };
                        break;
                    case 'between':
                        if (Array.isArray(value) && value.length === 2) {
                            filter[field] = {
                                $gte: new Date(value[0]),
                                $lte: new Date(value[1])
                            };
                        }
                        break;
                }
            }
            else {
                filter[key] = value;
            }
        });
        return filter;
    }
    static buildUpdate(data) {
        return data;
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query.builder.js.map