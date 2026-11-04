"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelController = void 0;
const common_1 = require("@nestjs/common");
const label_service_1 = require("../services/label.service");
const label_dto_1 = require("../dto/label.dto");
const auth_guard_1 = require("../../../common/guards/auth.guard");
const get_user_decorator_1 = require("../../../common/decorators/get-user.decorator");
let LabelController = class LabelController {
    labelService;
    constructor(labelService) {
        this.labelService = labelService;
    }
    findAll(userId) {
        return this.labelService.findAll(userId);
    }
    findOne(id, userId) {
        return this.labelService.findOne(id, userId);
    }
    create(userId, dto) {
        return this.labelService.create(userId, dto);
    }
    update(id, userId, dto) {
        return this.labelService.update(id, userId, dto);
    }
    remove(id, userId) {
        return this.labelService.remove(id, userId);
    }
};
exports.LabelController = LabelController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.GetUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, label_dto_1.CreateLabelDto]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, label_dto_1.UpdateLabelDto]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LabelController.prototype, "remove", null);
exports.LabelController = LabelController = __decorate([
    (0, common_1.Controller)('labels'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [label_service_1.LabelService])
], LabelController);
//# sourceMappingURL=label.controller.js.map