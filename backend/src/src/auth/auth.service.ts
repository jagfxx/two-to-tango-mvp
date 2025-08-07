import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(body: { email: string; password: string; name?: string; interests?: string[], role?: string }) {
    const { email, password, name, interests, role } = body;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        name,
        role: role || 'user',
        interests: interests && interests.length > 0 ? {
          create: interests.map(int => ({ interest: { connectOrCreate: { where: { name: int }, create: { name: int } } } }))
        } : undefined,
      },
      include: { interests: { include: { interest: true } } }
    });
    return { id: user.id, email: user.email, name: user.name, interests: user.interests.map(i => i.interest.name) };
  }

  async login(body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email }, include: { interests: { include: { interest: true } } } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, name: user.name, interests: user.interests.map(i => i.interest.name), role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return { access_token: token };
  }
}

