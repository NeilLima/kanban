import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthRepository } from '../repository/auth.repository';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(authRepository: AuthRepository, jwtService: JwtService, configService: ConfigService);
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
    private generateToken;
}
