// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import {PrismaModule} from '../../prisma/prisma.module'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
