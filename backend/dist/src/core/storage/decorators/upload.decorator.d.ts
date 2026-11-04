export declare const ProcessUpload: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | {
    field?: string;
    required?: boolean;
} | undefined)[]) => ParameterDecorator;
export interface ProcessedUpload {
    data: string;
    type: 'image' | 'video' | 'audio';
    mimeType: string;
}
