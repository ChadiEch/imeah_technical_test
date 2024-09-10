import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Correct path based on your directory structure
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly jwtService: JwtService
  ) {}

 
  async signup(email: string, password: string, name: string) {
    try {
      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true, name: true }, // Include password in selection
      });
  
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
  
      // Hash the password before saving
      const hashedPassword =await bcrypt.hash(password,10) ;
  
      // Create the new user
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, name },
      });
       console.log("user created")
       
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Re-throw known error
      }
      console.error('Error during signup:', error.message);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async login(email: string, password: string) {
    try {
      // Fetch the user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
        },
      });

      // Check if the user exists
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Return user details (or token) if login is successful
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        message: 'Login successful',
        // Optionally return a JWT token or other authentication data here
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Login failed');
    }
  }
}