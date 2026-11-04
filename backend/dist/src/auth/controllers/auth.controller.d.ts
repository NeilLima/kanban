import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            profile: {
                id: string;
                firstName: string;
                lastName: string;
                countryIso2: string | null;
                stateIso2: string | null;
                city: string | null;
                birthDate: Date | null;
                gender: string | null;
                userId: string;
            } | null;
        } & {
            id: string;
            email: string;
            username: string | null;
            password: string;
            avatar: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string | null;
            password: string;
            avatar: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
