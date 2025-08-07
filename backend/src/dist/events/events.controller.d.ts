import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(body: any, req: any): Promise<{
        id: number;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, body: any, req: any): Promise<{
        id: number;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        title: string;
        description: string;
        date: Date;
        location: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    rsvp(id: string, req: any): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        eventId: number;
    }>;
    getAttendees(id: string): Promise<{
        id: number;
        email: string;
        name: string | null;
        interests: string[];
    }[]>;
    getSuggestions(id: string, req: any): Promise<{
        id: number;
        email: string;
        name: string | null;
        sharedInterests: string[];
    }[]>;
}
