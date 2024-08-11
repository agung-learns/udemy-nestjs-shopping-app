import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRequest } from './dto/create-product.request';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-image';
import { Prisma } from '@prisma/client/extension';
import { ProductsGateway } from './products.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}
  async createProduct(createProduct: CreateProductRequest, userId: number) {
    const product = await this.prismaService.product.create({
      data: {
        ...createProduct,
        userId,
      },
    });
    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProducts(status: string) {
    const args: any = {};
    if (status === 'available') {
      args.where = { sold: false };
    }
    const products = await this.prismaService.product.findMany(args);

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
        join(`${PRODUCT_IMAGES}/${productId}.png`),
        fs.constants.F_OK,
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async update(id: number, data: any) {
    const product = await this.prismaService.product.update({
      where: {
        id,
      },
      data,
    });
    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProduct(id: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: { id },
      });
      return {
        ...product,
        imageExist: await this.imageExist(id),
      };
    } catch (e) {
      throw new NotFoundException('product not found');
    }
  }
}
