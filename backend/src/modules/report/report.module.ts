/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { ReportRepository } from './repository/report.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
  exports: [ReportService],
})
export class ReportModule {}
