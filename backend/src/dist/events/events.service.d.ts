import { PrismaService } from '../prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
    }>;
    update(id: number, data: any, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
    }>;
    rsvp(eventId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        eventId: number;
    }>;
    getAttendees(eventId: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        interests: string[];
    }[]>;
    getSuggestedAttendees(eventId: number, userId: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        sharedInterests: string[];
    }[]>;
}
