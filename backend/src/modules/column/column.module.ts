/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';
import { ColumnRepository } from './repository/column.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
  exports: [ColumnService, ColumnRepository],
})
export class ColumnModule {}