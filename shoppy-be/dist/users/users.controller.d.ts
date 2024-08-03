import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(request: CreateUserRequest): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
