"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, userId) {
        return this.prisma.event.create({
            data: {
                ...data,
                tags: data.tags || [],
            },
        });
    }
    async findAll() {
        return this.prisma.event.findMany({
            orderBy: { date: 'asc' },
        });
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async update(id, data, userId) {
        return this.prisma.event.update({ where: { id }, data });
    }
    async remove(id, userId) {
        return this.prisma.event.delete({ where: { id } });
    }
    async rsvp(eventId, userId) {
        const existing = await this.prisma.rSVP.findUnique({ where: { userId_eventId: { userId, eventId } } });
        if (existing)
            return existing;
        return this.prisma.rSVP.create({ data: { userId, eventId } });
    }
    async getAttendees(eventId) {
        const rsvps = await this.prisma.rSVP.findMany({
            where: { eventId },
            include: { user: { include: { interests: { include: { interest: true } } } } },
        });
        return rsvps.map(rsvp => ({
            id: rsvp.user.id,
            email: rsvp.user.email,
            name: rsvp.user.name,
            interests: rsvp.user.interests.map(i => i.interest.name)
        }));
    }
    async getSuggestedAttendees(eventId, userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { interests: { include: { interest: true } } }
        });
        if (!user)
            return [];
        const userInterests = user.interests.map(i => i.interest.name);
        const rsvps = await this.prisma.rSVP.findMany({
            where: { eventId },
            include: { user: { include: { interests: { include: { interest: true } } } } },
        });
        return rsvps
            .filter(rsvp => rsvp.user.id !== userId)
            .map(rsvp => {
            const sharedInterests = rsvp.user.interests
                .map(i => i.interest.name)
                .filter(i => userInterests.includes(i));
            return {
                id: rsvp.user.id,
                email: rsvp.user.email,
                name: rsvp.user.name,
                sharedInterests
            };
        })
            .filter(att => att.sharedInterests.length > 0);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map