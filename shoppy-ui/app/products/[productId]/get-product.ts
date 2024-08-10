import { get } from "@/app/common/utils/fetch";
import { IProduct } from "@/app/products/interfaces/product.interface";

export default async function getProduct(productId: number) {
  return get<IProduct>(`products/${productId}`);
}
