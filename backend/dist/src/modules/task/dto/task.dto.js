var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsArray, Min, Max, } from 'class-validator';
export class CreateTaskDto {
    title;
    description;
    columnId;
    category;
    color;
    dueDate;
    estimatedTime;
    assigneeIds;
    labelIds;
    status;
    priority;
    projectId;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Título da tarefa é obrigatório' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "columnId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "category", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "color", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "dueDate", void 0);
__decorate([
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "estimatedTime", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "assigneeIds", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "labelIds", void 0);
__decorate([
    IsEnum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "status", void 0);
__decorate([
    IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "projectId", void 0);
export class UpdateTaskDto {
    title;
    description;
    category;
    color;
    status;
    priority;
    dueDate;
    progress;
    order;
    assigneeIds;
    labelIds;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "category", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "color", void 0);
__decorate([
    IsEnum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "status", void 0);
__decorate([
    IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "priority", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "dueDate", void 0);
__decorate([
    IsInt(),
    Min(0),
    Max(100),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateTaskDto.prototype, "progress", void 0);
__decorate([
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateTaskDto.prototype, "order", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], UpdateTaskDto.prototype, "assigneeIds", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], UpdateTaskDto.prototype, "labelIds", void 0);
export class MoveTaskDto {
    columnId;
    order;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: 'Coluna de destino é obrigatória' }),
    __metadata("design:type", String)
], MoveTaskDto.prototype, "columnId", void 0);
__decorate([
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], MoveTaskDto.prototype, "order", void 0);
//# sourceMappingURL=task.dto.js.map