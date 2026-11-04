/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do projeto é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  icon?: string;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome da coluna é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  color?: string;
}

export class UpdateColumnDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
