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

import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetUser } from '../../../common/decorators/get-user.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.userService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.userService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.userService.remove(id, userId);
  }

  @Get(':id/profile')
  getProfile(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.userService.getProfile(id, userId);
  }

  @Patch(':id/avatar')
  updateAvatar(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
    @Body() body: { avatarUrl: string },
  ) {
    return this.userService.updateAvatar(id, userId, body.avatarUrl);
  }
}