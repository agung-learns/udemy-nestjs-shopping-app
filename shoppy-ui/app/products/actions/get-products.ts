"use server";

import { get } from "@/app/common/utils/fetch";
import { IProduct } from "@/app/products/interfaces/product.interface";

export default async function getProducts() {
  return get<IProduct[]>(
    "products",
    ["products"],
    new URLSearchParams({
      status: "available",
    }),
  );
}
