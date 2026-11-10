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
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TeamService } from '../services/team.service.js';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { GetUser } from '../../../common/decorators/get-user.decorator.js';
let TeamController = class TeamController {
    teamService;
    constructor(teamService) {
        this.teamService = teamService;
    }
    getMembers(userId) {
        return this.teamService.getMembers(userId);
    }
    getMemberDetail(userId, memberId) {
        return this.teamService.getMemberDetail(userId, memberId);
    }
};
__decorate([
    Get('members'),
    __param(0, GetUser('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "getMembers", null);
__decorate([
    Get('members/:userId'),
    __param(0, GetUser('userId')),
    __param(1, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "getMemberDetail", null);
TeamController = __decorate([
    Controller('team'),
    UseGuards(AuthGuard),
    __metadata("design:paramtypes", [TeamService])
], TeamController);
export { TeamController };
//# sourceMappingURL=team.controller.js.map