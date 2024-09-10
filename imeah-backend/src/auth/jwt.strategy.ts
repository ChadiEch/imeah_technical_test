// src/auth/jwt.strategy.ts
import { Injectable, Optional } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface.js'; // Define this interface to represent the JWT payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
     super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // Ensure JWT_SECRET is correctly set
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email }; // Customize this as needed
  }
}
