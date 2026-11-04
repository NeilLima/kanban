/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  username?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}