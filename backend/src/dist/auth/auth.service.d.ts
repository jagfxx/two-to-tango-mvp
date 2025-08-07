import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(body: {
        email: string;
        password: string;
        name?: string;
        interests?: string[];
        role?: string;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        interests: string[];
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
