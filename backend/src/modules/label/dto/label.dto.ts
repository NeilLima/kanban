/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da label é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsNotEmpty({ message: 'projectId é obrigatório' })
  projectId: string;
}

export class UpdateLabelDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;
}