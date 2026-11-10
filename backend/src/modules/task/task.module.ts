/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TaskController } from './controllers/task.controller.js';
import { TaskService } from './services/task.service.js';
import { TaskRepository } from './repository/task.repository.js';
import { ProjectRepository } from '../project/repository/project.repository.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, ProjectRepository],
  exports: [TaskService],
})
export class TaskModule {}
