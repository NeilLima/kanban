/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da coluna é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsNotEmpty({ message: 'projectId é obrigatório' })
  projectId: string;
}

export class UpdateColumnDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;
}