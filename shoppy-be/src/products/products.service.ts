import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';
import { promises as fs } from 'fs';
import { join } from 'path';

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
    const products = await this.prismaService.product.findMany();

    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExist: await this.imageExist(product.id),
      })),
    );
  }

  async imageExist(productId: number) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/products/${productId}.png`),
        fs.constants.F_OK,
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async getProduct(id: number) {
    return {
      id,
    };
  }
}
