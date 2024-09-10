import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string | null;
        createdAt: Date | null;
    }>;
    login(loginDto: LoginDto): Promise<{
        userId: number;
        email: string;
        name: string;
        message: string;
    }>;
}
