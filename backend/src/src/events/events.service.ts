import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: number) {
    return this.prisma.event.create({
      data: {
        ...data,
        tags: data.tags || [],
        // Puedes asociar el creador si el modelo lo permite
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: number, data: any, userId: number) {
    // Aquí podrías validar que solo el creador edite el evento
    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: number, userId: number) {
    // Aquí podrías validar que solo el creador elimine el evento
    return this.prisma.event.delete({ where: { id } });
  }

  // RSVP a un evento
  async rsvp(eventId: number, userId: number) {
    // Evitar RSVP duplicado
    const existing = await this.prisma.rSVP.findUnique({ where: { userId_eventId: { userId, eventId } } });
    if (existing) return existing;
    return this.prisma.rSVP.create({ data: { userId, eventId } });
  }

  // Obtener asistentes de un evento
  async getAttendees(eventId: number) {
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

  // Sugerir asistentes con intereses compartidos
  async getSuggestedAttendees(eventId: number, userId: number) {
    // Obtener intereses del usuario
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { interests: { include: { interest: true } } }
    });
    if (!user) return [];
    const userInterests = user.interests.map(i => i.interest.name);
    // Obtener asistentes del evento
    const rsvps = await this.prisma.rSVP.findMany({
      where: { eventId },
      include: { user: { include: { interests: { include: { interest: true } } } } },
    });
    // Sugerir asistentes distintos al usuario, con intereses en común
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
}

