export declare const authConfig: () => {
    jwtSecret: string;
    jwtExpiresIn: string;
};
declare const _default: (() => {
    jwtSecret: string;
    jwtExpiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    jwtExpiresIn: string;
}>;
export default _default;
