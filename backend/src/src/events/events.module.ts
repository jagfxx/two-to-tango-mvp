import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  providers: [EventsService, PrismaService, JwtAuthGuard],
  controllers: [EventsController]
})
export class EventsModule {}
