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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signup(email, password, name) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email },
                select: { id: true, email: true, password: true, name: true },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.prisma.user.create({
                data: { email, password: hashedPassword, name },
            });
            console.log("user created");
            return user;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            console.error('Error during signup:', error.message);
            throw new common_1.InternalServerErrorException('Failed to create user');
        }
    }
    async login(email, password) {
        try {
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
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            return {
                userId: user.id,
                email: user.email,
                name: user.name,
                message: 'Login successful',
            };
        }
        catch (error) {
            console.error('Login error:', error);
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map