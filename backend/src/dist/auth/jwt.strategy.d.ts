import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        role: string;
    }>;
}
export {};
