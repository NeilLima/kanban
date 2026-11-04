/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LabelController } from './controllers/label.controller';
import { LabelService } from './services/label.service';
import { LabelRepository } from './repository/label.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [LabelController],
  providers: [LabelService, LabelRepository],
  exports: [LabelService, LabelRepository],
})
export class LabelModule {}