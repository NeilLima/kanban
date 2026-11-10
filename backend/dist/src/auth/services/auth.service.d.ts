import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from '../dto/auth.dto.js';
import { AuthRepository } from '../repository/auth.repository.js';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: AuthRepository, jwtService: JwtService, configService: ConfigService);
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
    private generateToken;
}
