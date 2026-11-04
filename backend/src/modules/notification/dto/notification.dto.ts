/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty({ message: 'userId é obrigatório' })
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  taskId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}

export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  message?: string;
}