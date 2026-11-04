/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LabelService } from '../services/label.service';
import { CreateLabelDto, UpdateLabelDto } from '../dto/label.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';

@Controller('labels')
@UseGuards(AuthGuard)
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.labelService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.labelService.findOne(id, userId);
  }

  @Post()
  create(@GetUser('userId') userId: string, @Body() dto: CreateLabelDto) {
    return this.labelService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateLabelDto,
  ) {
    return this.labelService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.labelService.remove(id, userId);
  }
}