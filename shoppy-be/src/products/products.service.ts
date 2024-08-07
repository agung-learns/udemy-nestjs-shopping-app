import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createProduct(createProduct: CreateProductRequest, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...createProduct,
        userId,
      },
    });
  }

  async getProducts() {
    return this.prismaService.product.findMany();
  }

  async getProduct(id: number) {
    return {
      id,
    };
  }
}
