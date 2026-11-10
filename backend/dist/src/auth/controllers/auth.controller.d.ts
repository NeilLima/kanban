import { AuthService } from '../services/auth.service.js';
import { LoginDto, RegisterDto } from '../dto/auth.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            profile: {
                firstName: string;
                lastName: string;
                countryIso2: string | null;
                stateIso2: string | null;
                city: string | null;
                birthDate: Date | null;
                gender: string | null;
                id: string;
                userId: string;
            } | null;
        } & {
            email: string;
            password: string;
            id: string;
            username: string | null;
            avatar: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            password: string;
            id: string;
            username: string | null;
            avatar: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
