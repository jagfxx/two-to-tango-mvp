import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any, @Request() req: any) {
    return this.eventsService.create(body, req.user.id);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.eventsService.update(+id, body, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.remove(+id, req.user.id);
  }

  // RSVP a un evento
  @Post(':id/rsvp')
  async rsvp(@Param('id') id: string, @Request() req: any) {
    console.log('Solicitud RSVP recibida para el evento ID:', id);
    console.log('Usuario autenticado ID:', req.user?.id);
    console.log('Headers de la solicitud:', req.headers);
    
    if (!req.user?.id) {
      console.error('Error: Usuario no autenticado');
      throw new UnauthorizedException('Usuario no autenticado');
    }
    
    try {
      const result = await this.eventsService.rsvp(+id, req.user.id);
      console.log('RSVP exitoso:', result);
      return result;
    } catch (error) {
      console.error('Error en RSVP:', error);
      throw error;
    }
  }

  // Obtener asistentes de un evento
  @Get(':id/attendees')
  getAttendees(@Param('id') id: string) {
    return this.eventsService.getAttendees(+id);
  }

  // Sugerencias de asistentes para un usuario en un evento
  @Get(':id/suggestions')
  getSuggestions(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.getSuggestedAttendees(+id, req.user.id);
  }
}

