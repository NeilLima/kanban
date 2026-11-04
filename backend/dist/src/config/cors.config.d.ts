export declare const corsConfig: {
    origin: boolean | (string | undefined)[];
    methods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    preflightContinue: boolean;
    optionsSuccessStatus: number;
};
declare const _default: (() => {
    origin: boolean | (string | undefined)[];
    methods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    preflightContinue: boolean;
    optionsSuccessStatus: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    origin: boolean | (string | undefined)[];
    methods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    preflightContinue: boolean;
    optionsSuccessStatus: number;
}>;
export default _default;
