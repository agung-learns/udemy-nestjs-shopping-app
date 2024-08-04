import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client/extension';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exist.');
      }
      throw e;
    }
  }

  async getUser(filter: any) {
    return this.prismaService.user.findFirstOrThrow({
      where: filter,
    });
  }
}