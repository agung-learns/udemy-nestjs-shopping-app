import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {Type} from "class-transformer";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}
