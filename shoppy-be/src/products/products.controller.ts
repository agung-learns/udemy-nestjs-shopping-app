import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_IMAGES } from './product-image';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(body, user.userId);
  }

  @Post(':productId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: PRODUCT_IMAGES,
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.productId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {
    console.log(_file);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getProducts(@Query('status') status: string) {
    return this.productsService.getProducts(status);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(+id);
  }
}
