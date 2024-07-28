import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(data: CreateUserRequest): Promise<User>;
}
