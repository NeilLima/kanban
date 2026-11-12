/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsArray,
  IsDateString,
  Min,
  Max,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Título da tarefa é obrigatório' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  columnId?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  estimatedTime?: number;

  @IsArray()
  @IsOptional()
  assigneeIds?: string[];

  @IsArray()
  @IsOptional()
  labelIds?: string[];

  /** Nomes de etiquetas digitados pelo usuário — o backend resolve/cria
   *  as Label do projeto e vincula à tarefa */
  @IsArray()
  @IsOptional()
  tagNames?: string[];

  @IsEnum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'])
  @IsOptional()
  status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  @IsString()
  @IsOptional()
  projectId?: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'])
  @IsOptional()
  status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  @IsOptional()
  dueDate?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @IsArray()
  @IsOptional()
  assigneeIds?: string[];

  @IsArray()
  @IsOptional()
  labelIds?: string[];

  /** Nomes de etiquetas — resolve/cria Label do projeto e substitui as atuais */
  @IsArray()
  @IsOptional()
  tagNames?: string[];
}

export class MoveTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Coluna de destino é obrigatória' })
  columnId: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UploadAttachmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do arquivo é obrigatório' })
  fileName: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo MIME é obrigatório' })
  mimeType: string;

  /** Conteúdo do arquivo em base64 (com ou sem prefixo data:) */
  @IsString()
  @IsNotEmpty({ message: 'Conteúdo do arquivo é obrigatório' })
  data: string;
}
