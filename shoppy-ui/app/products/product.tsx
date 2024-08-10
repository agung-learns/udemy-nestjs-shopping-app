"use client";

import { Card, Stack, CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IProduct } from "@/app/products/interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "@/app/products/product-image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card className="m-1 p-5">
        <Stack gap={3}>
          <Typography variant="h4">{product.name}</Typography>
          {product.imageExist && (
            <Image
              src={getProductImage(product.id)}
              alt={product.name}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>$ {product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
