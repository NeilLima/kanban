import { PrismaService } from '../../core/prisma/prisma.service';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        username: string | null;
        password: string;
        avatar: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    createUser(data: any): Promise<{
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
    }>;
}
