import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    signup(email: string, password: string, name: string): Promise<{
        id: number;
        email: string;
        name: string;
        password: string | null;
        createdAt: Date | null;
    }>;
    login(email: string, password: string): Promise<{
        userId: number;
        email: string;
        name: string;
        message: string;
    }>;
}
